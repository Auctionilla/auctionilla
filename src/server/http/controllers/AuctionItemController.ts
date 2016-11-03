import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService, CategoryService, AuctionSiteService, CountryListService } from 'app/services';


@injectable
export class AuctionItemController extends Controller {

  constructor(private auctionItemService: AuctionItemService,
              private categoryService: CategoryService,
              private auctionSiteService: AuctionSiteService,
              private countryListService: CountryListService) {
    super();
  }

  public async index(request: Request, response: Response) {

    return response.render('objects');
  }


  public async listItems(request: Request, response: Response) {
    let searchItem = "";
    let offset = 1;
    let categoryName = "";
    let auction_house = "";
    let chkparamsearch = request.param('searchItem');
    let auctionHouse = request.input.get('auction-house');
    if (auctionHouse) {
      auction_house = auctionHouse
    }
    let category = request.input.get('categories');
    if (category != 'all_category') {
      categoryName = category;
    } else if (category == 'all_category') {
      categoryName = "";
    }
    if (chkparamsearch) {
      console.log('no param search')
      searchItem = chkparamsearch
    } else {
      searchItem = request.input.get('searchItem');
    }
    let page = request.param('offset');
    if (!page) {
      console.log('no offset specified');
      offset = 1;
    } else {
      offset = parseInt(page);
    }
    let limit = 5;
    let chkparamlimit = request.param('limit');
    if (!chkparamlimit) {
      console.log('no limit specified');
      limit = 10;
    } else {
      limit = parseInt(chkparamlimit)
    }
    let items = await this.auctionItemService.searchAuction(searchItem, category, (offset - 1) * 10, limit);
    let data = [];
    items.forEach(item => {
      let jsonItem = item.toJSON();
      data.push(jsonItem);
    });
    //let itemcount = await this.auctionItemService.getSearchItemCount(searchItem);
    //let total = itemcount.get('total') / limit;
    let total = 1;
    console.log(total)
    console.log('the search:');
    console.log(searchItem);
    console.log('search param');
    console.log(chkparamsearch);
    console.log('the category');
    console.log(category)
    return response.render('/index', { data, page, search : searchItem, total });
  }

  public async searchItem(request: Request, response: Response) {
    let countries = await this.countryListService.getAllCountry();
    console.log('the session');
    console.log(request.session.get('loggedUser'))
    if (request.session.get('loggedUser').id) {
      let loggedUserId = request.session.get('loggedUser').id;
      console.log('this is the logged user id');
      console.log(loggedUserId);
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

    let items = await this.auctionItemService.searchAuction(search, category, auction_house, (offset - 1) * 10, page);
    let itemcount = await this.auctionItemService.getSearchItemCount(search, category, auction_house, (offset - 1) * 10, page);
    let data = [];
    items.forEach(item => {
      let jsonItem = item.toJSON();
      data.push(jsonItem);
    });
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

    return response.render('indexitem', { data, categories: categoryItems, sites, page, search, category, auction_house, offset, total, countries, country });
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
