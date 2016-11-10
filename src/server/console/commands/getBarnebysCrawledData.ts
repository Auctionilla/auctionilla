import { ArtisanCommand } from 'chen/console';
import { injectable, _ } from 'chen/core';
import { HttpClient} from 'chen/web'; //, HttpClientOptions
import { CategoryService, AuctionItemService, AuctionSiteService } from 'app/services'
// const json2csv = require('json2csv');


@injectable
export class getBarnebysCrawledData extends ArtisanCommand {
  constructor(private httpCLIENT: HttpClient, 
    private auctionItemService: AuctionItemService,
    private categoryService: CategoryService,
    private auctionSiteService: AuctionSiteService
    ) {//, private httpClientOptions: HttpClientOptions
    super();
  }
  async getdataFromBarnebys () {

    //this.getArgument('spider')
    let jsondata = await this.httpCLIENT.get('http://localhost:9000/api/crawlers/1/data')
    let thejsondata = JSON.parse(jsondata.body)
    let tosave = {}
    // console.log(thejsondata)
    for(var attributename in thejsondata.results){
      console.log(attributename)
        // for (var attr2 in thejsondata.Directory.Groups[attributename].Items) {
      let chkIfNotNull = thejsondata.results[attributename].content.itemDetails.itemTitle
      if (chkIfNotNull) {
        let theitemtitle = _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemTitle), '&', 'and')
        console.log('the item title', theitemtitle)
        //let getAuctionSiteId = await this.auctionSiteService.getOneBy('site_url', String(thejsondata.results[attributename].content.itemDetails.auctionSite))
        let categoryId;
        let checkIfCategoryExist = await this.categoryService.getOneBy('category_name', _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemcategory), '&', 'and'))
        if (checkIfCategoryExist) {
        	console.log('categor exist', _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemcategory), '&', 'and'))
        	categoryId = await this.categoryService.getOneBy('category_name', _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemcategory), '&', 'and'))
        } else {
        	let data = {
        		category_name: _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemcategory), '&', 'and'),
        		description: ""
        	}
        	let createCateg = await this.categoryService.createCategory(data)
        	if (createCateg) {
        		console.log('============category created. ' +thejsondata.results[attributename].content.itemDetails.itemcategory+'=============')
        		categoryId = await this.categoryService.getOneBy('category_name', _.replaceAll(String(thejsondata.results[attributename].content.itemDetails.itemcategory), '&', 'and'))
        	}
        }
        let siteId;
        let checkIfSiteExist = await this.auctionSiteService.getOneBy('site_name', thejsondata.results[attributename].content.itemDetails.auctionSite)
        if (checkIfSiteExist) {
        	console.log('auctionsite already exist', thejsondata.results[attributename].content.itemDetails.auctionSite)
        	siteId = checkIfSiteExist.get('id')
        } else {
        	console.log('item not exist')
        	let data = {
        		site_name: thejsondata.results[attributename].content.itemDetails.auctionSite,
        		site_url: '',
        		site_emblem: thejsondata.results[attributename].content.itemDetails.auctionSiteLogo
        	}
        	let addSite = await this.auctionSiteService.create(data)
        	let getSiteId = await this.auctionSiteService.getOneBy('site_name', thejsondata.results[attributename].content.itemDetails.auctionSite)
        	siteId = getSiteId.get('id')
        	console.log('this is the new site id:', siteId)
        	if (addSite) {
        		console.log('site is added', data)
        	}
        }

        let getprice = thejsondata.results[attributename].content.itemDetails.price
        let theprice;
        if (getprice) {
        	theprice = parseInt(_.replaceAll(String(thejsondata.results[attributename].content.itemDetails.price), ' ',''))
        }
        // let theLocation = thejsondata.results[attributename].content.itemDetails.location;
        // let getLocation = await this.countryListService.getOneBy('country_name', theLocation)
        // if (!getLocation) {
        //   console.log('location none, save')
        //   let addcountry = await this.countryListService.addCountry(theLocation, '')
        //   if (addcountry) {
        //     console.log('added new location:', theLocation)
        //   }
        // }


       
        tosave = {
          item_title: theitemtitle,
          item_description: thejsondata.results[attributename].content.itemDetails.description,
          auction_url: thejsondata.results[attributename].content.itemDetails.auctionUrl,
          item_image: thejsondata.results[attributename].content.itemDetails.itemImage,
          price_status: thejsondata.results[attributename].content.itemDetails.priceStatus,
          price: theprice,
          currency: thejsondata.results[attributename].content.itemDetails.currency,
          location: thejsondata.results[attributename].content.itemDetails.location,
          auction_date: thejsondata.results[attributename].content.itemDetails.auctionDate,
          category_id_fk: categoryId.get('id'),
          auction_site_fk: siteId
        }

        console.log(tosave)

        let checkIfExistTitle = await this.auctionItemService.getOneBy('item_title', theitemtitle)

        if (!checkIfExistTitle) {
          console.log('going to save this!')
          let savethis = await this.auctionItemService.create(tosave)
          if (savethis) {
            console.log('************saved!*********:', tosave)
          }
        
        } else {
        	console.log('not going to save this item')
        }
      } 
    }
    return jsondata
  }
  public msg() {
  	
  }


  public async execute() {
    
    await this.getdataFromBarnebys()
    
    
  }
}
