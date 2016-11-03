import { ArtisanCommand } from 'chen/console';
import { injectable, _ } from 'chen/core';
import { HttpClient} from 'chen/web'; //, HttpClientOptions
import { AuctionSiteService, CategoryService, AuctionItemService } from 'app/services'
// const json2csv = require('json2csv');


@injectable
export class getCrawledData extends ArtisanCommand {
  constructor(private httpCLIENT: HttpClient, 
    private auctionSiteService: AuctionSiteService, 
    private auctionItemService: AuctionItemService,
    private categoryService: CategoryService) {//, private httpClientOptions: HttpClientOptions
    super();
  }
  async getdataFromChristies () {

    //this.getArgument('spider')
    let jsondata = await this.httpCLIENT.get('http://localhost:9000/api/crawlers/1/data')
    let thejsondata = JSON.parse(jsondata.body)
    let tosave = {}
    // console.log(thejsondata)
    for(var attributename in thejsondata.results){
      
        // for (var attr2 in thejsondata.Directory.Groups[attributename].Items) {
      let chkIfNotNull = thejsondata.results[attributename].content.theItemDetails.thetitle
      if (chkIfNotNull) {
        let theitemtitle = _.replaceAll(String(thejsondata.results[attributename].content.theItemDetails.theItemtitle), '&', 'and')
        console.log(theitemtitle)
        let getAuctionSiteId = await this.auctionSiteService.getOneBy('site_url', String(thejsondata.results[attributename].content.theItemDetails.auctionSite))
        let categoryId = await this.categoryService.getOneBy('category_name', String(thejsondata.results[attributename].content.theItemDetails.category))
        let price = thejsondata.results[attributename].content.theItemDetails.price;
        let theprice;
        if (price) {
          theprice = parseInt(_.replaceAll(price,',',''));
        } else {
          theprice = 0;
        }
        console.log('this is the id of the site:', getAuctionSiteId.get('id'))
        console.log('this is the id of the category:', thejsondata.results[attributename].content.theItemDetails.category, categoryId.get('id'))
        tosave = {
          item_title: theitemtitle,
          item_description: thejsondata.results[attributename].content.theItemDetails.item_description,
          auction_url: thejsondata.results[attributename].content.theItemDetails.auction_url,
          item_image: thejsondata.results[attributename].content.theItemDetails.item_image,
          price_status: thejsondata.results[attributename].content.theItemDetails.price_status,
          price: theprice,
          currency: thejsondata.results[attributename].content.theItemDetails.currency,
          location: thejsondata.results[attributename].content.theItemDetails.location,
          auction_date: thejsondata.results[attributename].content.theItemDetails.auction_date,
          category_id_fk: categoryId.get('id'),
          auction_site_fk: getAuctionSiteId.get('id')
        }

        let checkIfExistTitle = await this.auctionItemService.getOneBy('item_title', theitemtitle)

        if (!checkIfExistTitle) {
          let savethis = await this.auctionItemService.create(tosave)
          if (savethis) {
            console.log('************saved!*********:', tosave)
          }
        
        } 
      } 
    }
    return jsondata
  }

  async getDataFromHeritage() {
    let jsondata = await this.httpCLIENT.get('http://localhost:9000/api/crawlers/3/data')
    let thejsondata = JSON.parse(jsondata.body)
    for(var attributename in thejsondata.results) {
      
      let chkIfNotNull = thejsondata.results[attributename].content.itemData.itemTitle
      if (chkIfNotNull) {
        let categoryId = await this.categoryService.getOneBy('category_name', thejsondata.results[attributename].content.itemData.category)
        let getAuctionSiteId = await this.auctionSiteService.getOneBy('site_url', thejsondata.results[attributename].content.itemData.auctionSite)
        
        let chkIfExist = await this.auctionItemService.getOneBy('item_title', String(thejsondata.results[attributename].content.itemData.itemTitle))
        if (!chkIfExist) {
         console.log('*************** save item **********')
         let price = 0;
         let currency = 'USD';
         let chkprice = thejsondata.results[attributename].content.itemData.price
         console.log('this is the price', chkprice)
         if (chkprice == 'undefined') {
           price = 0;
         } else {
           price = parseInt(chkprice)
         }
         let chkCurrency = thejsondata.results[attributename].content.itemData.currency;
         if (chkCurrency != 'undefined') {
           currency = chkCurrency
         }

        let tosave = {
          item_title: String(thejsondata.results[attributename].content.itemData.itemTitle),
          item_description: String(thejsondata.results[attributename].content.itemData.description),
          auction_url: thejsondata.results[attributename].content.itemData.auctionUrl,
          item_image: thejsondata.results[attributename].content.itemData.itemImage,
          price_status: thejsondata.results[attributename].content.itemData.priceStatus,
          price: price,
          currency: currency,
          location: thejsondata.results[attributename].content.itemData.location,
          auction_date: String(thejsondata.results[attributename].content.itemData.auctionDate) + String(' 00:00:00'),
          category_id_fk: categoryId.get('id'),
          auction_site_fk: getAuctionSiteId.get('id')
        }
        console.log(tosave)
        let saveData = await this.auctionItemService.create(tosave);
        if (saveData) {
          console.log('item saved!!')
        }
      } 
    }
      
    }
    //console.log(thejsondata)
    return thejsondata
  }

  async getDataFromSothebys() {
    let jsondata = await this.httpCLIENT.get('http://localhost:9000/api/crawlers/2/data')
    let thejsondata = JSON.parse(jsondata.body)
    for(var attributename in thejsondata.results) {
      
      let chkIfNotNull = thejsondata.results[attributename].content.itemData.title
      console.log(chkIfNotNull)
      if (chkIfNotNull) {
        let tocheck;
        let checkIfNull = thejsondata.results[attributename].content.itemData.itemSubtitle
        if (checkIfNull) {
           console.log('subtitle present')
           tocheck = thejsondata.results[attributename].content.itemData.itemSubtitle
        } else {
          console.log('not present subtitle')
          tocheck = thejsondata.results[attributename].content.itemData.title
        }
        let chkIfExist = await this.auctionItemService.getOneBy('item_title', String(tocheck))
        console.log('checking ', tocheck)
        if (!chkIfExist) {
          
          let price;
          let chkIfSold = thejsondata.results[attributename].content.itemData.soldPrice
          let categoryId = await this.categoryService.getOneBy('category_name', thejsondata.results[attributename].content.itemData.category)
          let getAuctionSiteId = await this.auctionSiteService.getOneBy('site_url', thejsondata.results[attributename].content.itemData.auctionSite)
        
          console.log('sold price', chkIfSold)
          if (chkIfSold != 'undefined') {
            price = chkIfSold
          } else {
            price = _.replaceAll(String(thejsondata.results[attributename].content.itemData.price), ',', '')
          }
          console.log('************ save this *****************')
          let tosave = {
            item_title: String(tocheck),
            item_description: String(thejsondata.results[attributename].content.itemData.itemDescription),
            auction_url: thejsondata.results[attributename].content.itemData.auctionUrl,
            item_image: thejsondata.results[attributename].content.itemData.itemImage,
            price_status: thejsondata.results[attributename].content.itemData.priceStatus,
            price: parseInt(price),
            currency: thejsondata.results[attributename].content.itemData.currency,
            location: thejsondata.results[attributename].content.itemData.location,
            auction_date: String(thejsondata.results[attributename].content.itemData.auctionDate) + String(':00'),
            category_id_fk: categoryId.get('id'),
            auction_site_fk: getAuctionSiteId.get('id')
          }
          console.log(tosave)
          let saveData = await this.auctionItemService.create(tosave);
          if (saveData) {
            console.log('item saved!!')
          }
        } 
      }

    }
    return jsondata
  }


  public async execute() {
    let arg = this.getArgument('auctionsite')
    console.log('spiders', arg)
    if (arg == 'christies') {
      await this.getdataFromChristies()
    } else if(arg == 'heritageAuction') {
      await this.getDataFromHeritage()
    } else if (arg == 'sothebys') {
      await this.getDataFromSothebys();
    } else if (arg == 'all-auction-site') {
      await this.getdataFromChristies()
      await this.getDataFromHeritage()
      await this.getDataFromSothebys();
    }
    
  }
}
