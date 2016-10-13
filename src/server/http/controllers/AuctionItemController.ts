import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService, CategoryService, AuctionSiteService, CountryListService, FavoriteService } from 'app/services';


@injectable
export class AuctionItemController extends Controller {

  constructor(private auctionItemService: AuctionItemService,
              private categoryService: CategoryService,
              private auctionSiteService: AuctionSiteService,
              private countryListService: CountryListService,
              private favoriteService: FavoriteService) {
    super();
  }

  public async index(request: Request, response: Response) {
    let cditems = await this.auctionItemService.getCountdownItems();
    var date = new Date();
    console.log(date.getDay())
    cditems.forEach(item => {
      let jsonItem = item.toJSON();
      console.log(jsonItem);
    });
    return response.render('index');
  }


  public async listItems(request: Request, response: Response) {
    let countries = await this.countryListService.getAllCountry();
    console.log('the session');
    let user = "";
    if (request.session.get('loggedUser')) {
      let loggedUserId = request.session.get('loggedUser').id;
      console.log('this is the logged user id');
      console.log(loggedUserId);
      user = loggedUserId;
    }
    let search = '';
    let category = '';
    let offset = 1;
    let page = 10;
    let auction_house = '';
    let country = '';
    let relevance = '';
    let getsearch = request.input.get('searchItem');
    if (getsearch) {
      search = getsearch;
    }
    let getcategory = request.input.get('category');
    if (getcategory) {
      category = getcategory;
    }
    let getoffset = request.input.get('offset');
    if (getoffset) {
      console.log('meron offset')
      offset = parseInt(getoffset);
    }
    let getpage = request.input.get('page');
    if (getpage) {
      page = parseInt(getpage);
    }
    let getAuction_house = request.input.get('auction-house');
    if (getAuction_house) {
      auction_house = getAuction_house;
    }
    let getCountry = request.input.get('countries');
    if (getCountry) {
      country = this.countryListService.getCountryCode(getCountry);
    }
    let getRelevance = request.input.get('relevance');
    if (getRelevance) {
      relevance = getRelevance;
    }
    let itemFilter = request.input.get('radiobuttonsearch');
    console.log('the item Filter');
    console.log(itemFilter);


    let items = await this.auctionItemService.searchAuction(search, category, auction_house, relevance, itemFilter, (offset - 1) * page, page);
    let itemcount = await this.auctionItemService.getSearchItemCount(search, category, auction_house, itemFilter);
    let data = [];

    //let tempDataholder = [];
    items.forEach(item => {
      let jsonItem = item.toJSON();
      // console.log(JSON.stringify(jsonItem));
      // console.log(jsonItem)
      data.push(jsonItem);
    });
    if (request.session.get('loggedUser')) {
      data.forEach(async (datas) => {
        let chkfav = await this.favoriteService.checkIfFavorite(request.session.get('loggedUser').id, datas.id);
        if (chkfav) {
          console.log('this is a favorite')
          datas['isFavorite'] = 1;
        }
        console.log(datas.id)
      });
    }

    console.log('the offset')
    console.log(offset)
    console.log('the page')
    console.log(page)
    console.log('the category');
    console.log(category)
    console.log('this is the new search Item');
    console.log(search);
    console.log('the auction house');
    console.log(auction_house);
    console.log('the country');
    console.log(country);
    console.log('this is the relevance');
    console.log(relevance)

    let total = parseInt(itemcount.get('total')) / page;
    console.log('total items');
    console.log(total);

    let categories = await this.categoryService.getAllCategories();
    let categoryItems = [];
    categories.forEach(items => {
      let jsonItem = items.toJSON();

      categoryItems.push(jsonItem);
    });

    let sitesItem = await this.auctionSiteService.getAll();
    let sites = [];
    sitesItem.forEach(items => {
      let jsonItem = items.toJSON();
      sites.push(jsonItem);
    });
    console.log(data)
    return response.render('objects', { data, categories: categoryItems, sites, page, search, category, auction_house, offset, total, countries, country: getCountry, relevance, itemFilter, user });
  }

  public async searchItem(request: Request, response: Response) {
    let countries = await this.countryListService.getAllCountry();
    console.log('the session');
    let user = "";
    if (request.session.get('loggedUser')) {
      let loggedUserId = request.session.get('loggedUser').id;
      console.log('this is the logged user id');
      console.log(loggedUserId);
      user = loggedUserId;
    }
    let search = '';
    let category = '';
    let offset = 1;
    let page = 10;
    let auction_house = '';
    let country = '';
    let relevance = '';
    let browsing = 'auction';
    let itemFilter = 'objects';
    let getBrowsing = request.input.get('browsing-auction')
    if (getBrowsing == 'realized') {
      console.log('dont use radio button filter')
      browsing = getBrowsing;
      itemFilter = getBrowsing;
    } else if(getBrowsing == 'auction') {
      let getitemFilter = request.input.get('radiobuttonsearch');
      if (getitemFilter) {
        browsing = 'objects';
        itemFilter = getitemFilter;

      }
    }
    console.log('the item filter');
    console.log(itemFilter)

    let getsearch = request.input.get('searchItem');
    if (getsearch) {
      search = getsearch;
    }
    let getcategory = request.input.get('category');
    if (getcategory) {
      category = getcategory;
    }
    let getoffset = request.input.get('offset');
    if (getoffset) {
      console.log('meron offset')
      offset = parseInt(getoffset);
    }
    let getpage = request.input.get('page');
    if (getpage) {
      page = parseInt(getpage);
    }
    let getAuction_house = request.input.get('auction-house');
    if (getAuction_house) {
      auction_house = getAuction_house;
    }
    let getCountry = request.input.get('countries');
    if (getCountry) {
      country = this.countryListService.getCountryCode(getCountry);
    }
    let getRelevance = request.input.get('relevance');
    if (getRelevance) {
      relevance = getRelevance;
    }



    let items = await this.auctionItemService.searchAuction(search, category, auction_house, relevance, itemFilter, (offset - 1) * page, page);
    let itemcount = await this.auctionItemService.getSearchItemCount(search, category, auction_house, itemFilter);
    let data = [];

    //let tempDataholder = [];
    items.forEach(item => {
      let jsonItem = item.toJSON();
      // console.log(JSON.stringify(jsonItem));
      // console.log(jsonItem)
      data.push(jsonItem);
    });
    if (request.session.get('loggedUser')) {
      data.forEach(async (datas) => {
        let chkfav = await this.favoriteService.checkIfFavorite(request.session.get('loggedUser').id, datas.id);
        if (chkfav) {
          console.log('this is a favorite')
          datas['isFavorite'] = chkfav.get('id');
        }
        console.log(datas.id)
      });
    }

    console.log('the offset')
    console.log(offset)
    console.log('the page')
    console.log(page)
    console.log('the category');
    console.log(category)
    console.log('this is the new search Item');
    console.log(search);
    console.log('the auction house');
    console.log(auction_house);
    console.log('the country');
    console.log(country);
    console.log('this is the relevance');
    console.log(relevance)

    let total = parseInt(itemcount.get('total'));
    console.log('total items');
    console.log(total);

    let categories = await this.categoryService.getAllCategories();
    let categoryItems = [];
    categories.forEach(items => {
      let jsonItem = items.toJSON();

      categoryItems.push(jsonItem);
    });

    let sitesItem = await this.auctionSiteService.getAll();
    let sites = [];
    sitesItem.forEach(items => {
      let jsonItem = items.toJSON();
      sites.push(jsonItem);
    });
    console.log(data)
    return response.render('objects', { data, categories: categoryItems, sites, page, search, category, auction_house, offset, total, countries, country: getCountry, relevance, itemFilter, user, browsing });
  }


  public async locationHits(request: Request, response: Response) {
    let hits = true;
    console.log(hits);
    return true;
  }


  public async createAuctionItem(request: Request, response: Response) {
    let data = {
      item_title: 'item 1',
      item_description: 'this is item 1',
      auction_url: 'http://www.itemsite.com/thisistheurl-of-the-item-1',
      item_image: 'some image',
      price_status: 'hammer price',
      price: '100',
      currency: 'USD',
      location: 'USA',
      auction_date: '2d 2h',
      category_id_fk: 1,
      auction_site_fk: 1
    }
    let additem = await this.auctionItemService.addAuctionItem(data);
    if (additem) {
      console.log('add item success');
    }
  }

 
}
