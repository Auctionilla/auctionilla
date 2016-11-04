import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService, CategoryService, AuctionSiteService, CountryListService, FavoriteService, PickOfTheDayService, PopularSearchService } from 'app/services';

const moment = require('moment')

@injectable
export class AuctionItemController extends Controller {
  constructor(private auctionItemService: AuctionItemService,
              private categoryService: CategoryService,
              private auctionSiteService: AuctionSiteService,
              private countryListService: CountryListService,
              private favoriteService: FavoriteService,
              private pickOfTheDayService: PickOfTheDayService,
              private popularSearchService: PopularSearchService) {
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
    let browsing = 'auction';
    let itemFilter = 'objects';
    let getBrowsing = request.input.get('browsing-auction')
    if (getBrowsing) {
      if (getBrowsing == 'realized') {
        console.log('dont use radio button filter')
        browsing = getBrowsing;
        itemFilter = getBrowsing;
      } else if(getBrowsing == 'auction') {
        console.log('browsing auction ')
        browsing = 'auction';
        let getitemFilter = request.input.get('radiobuttonsearch');
        if (getitemFilter) {
          console.log('the filter is' + getitemFilter);
          itemFilter = getitemFilter;

        }
      }
    }
    console.log('the item filter');
    console.log(itemFilter)
    console.log('browsing')
    console.log(browsing)

    let getsearch = request.input.get('searchItem');
    if (getsearch) {
      search = getsearch;

    }
    let getcategory = request.input.get('category');
    if (getcategory) {
      category = String(getcategory).trim();
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
      auction_house = String(getAuction_house).trim();
    }
    let getCountry = request.input.get('countries');
    if (getCountry) {
      if (getCountry != "All Countries") {
        let getcountrycode = this.countryListService.getCountryCode(getCountry);
        if (getcountrycode) {
          country = getcountrycode
        } else {
          country = getCountry
        }
      } else {
        country = 'All Countries';
      }
    }
    let getRelevance = request.input.get('relevance');
    if (getRelevance) {
      relevance = getRelevance;
    }



    let items = await this.auctionItemService.searchAuction(search, category, auction_house, country, relevance, itemFilter, (offset - 1) * page, page);
    let itemcount = await this.auctionItemService.getSearchItemCount(search, category, auction_house, country, relevance, itemFilter);
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
        // console.log(datas.id)
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
    console.log('the country code');
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
    // console.log(data)
    let thePick = {}
    let getPick = await this.pickOfTheDayService.getOneBy('id', 1);
    if (getPick) {
      let viewPick = await this.auctionItemService.getPickOfTheDayItem(getPick.get('item_id_fk'));
      // console.log('pick of the day')
      // console.log(viewPick)
      thePick = viewPick.toJSON()
      // console.log(thePick)
    } else {
      console.log('erro getting pick')
    }
    //console.log(data)
    // index return
    return response.render('objects', { data, categories: categoryItems, sites, page, search, category, auction_house, offset, total, countries, country, relevance, itemFilter, user, browsing, thePick });

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
    if (request.session.get('updateAlert')) {
      request.session.flash('updateAlert');
    }

    let search = '';
    let category = '';
    let offset = 1;
    let page = 10;
    let auction_house = '';
    let country = '';
    let convertedCountryName = '';
    let relevance = '';
    let browsing = 'auction';
    let itemFilter = 'objects';
    let getBrowsing = request.input.get('browsing-auction')
    if (getBrowsing) {
      if (getBrowsing == 'realized') {
        console.log('dont use radio button filter')
        browsing = getBrowsing;
        itemFilter = getBrowsing;
      } else if(getBrowsing == 'auction') {
        console.log('browsing auction ')
        browsing = 'auction';
        let getitemFilter = request.input.get('radiobuttonsearch');
        if (getitemFilter) {
          console.log('the filter is' + getitemFilter);
          itemFilter = getitemFilter;

        }
      }
    }
    console.log('the item filter');
    console.log(itemFilter)
    console.log('browsing')
    console.log(browsing)

    let getsearch = request.input.get('searchItem');
    if (getsearch) {
      search = getsearch;
      let insertPopularSearch = await this.popularSearchService.addSearch(search);

      if (insertPopularSearch) {
        console.log('search inserted to popular search');
      }
    }
    let getcategory = request.input.get('category');
    if (getcategory) {
      category = String(getcategory).trim();
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
      auction_house = String(getAuction_house).trim();
    }
    let getCountry = request.input.get('countries');
    if (getCountry) {
      if (getCountry != "All Countries") {
        let getcountrycode = this.countryListService.getCountryCode(getCountry);

        if (getcountrycode) {
          country = getcountrycode
          convertedCountryName = this.countryListService.getName(country);
        } else {
          country = getCountry
        }
      } else {
        country = 'All Countries';
      }
    }
    let getRelevance = request.input.get('relevance');
    if (getRelevance) {
      relevance = getRelevance;
    }



    let items = await this.auctionItemService.searchAuction(search, category, auction_house, country, relevance, itemFilter, (offset - 1) * page, page);
    let itemcount = await this.auctionItemService.getSearchItemCount(search, category, auction_house, country, relevance, itemFilter);
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
        console.log('this is the auction_date', String(datas.auction_date))
        let timeremaining = await this.getRemainingHours(String(datas.auction_date), datas.id, datas.days_remaining)
        let limitedDescription = String(datas.item_description).substring(0, 100)
        let limitItemTitle = String(datas.item_title).substring(0, 50)
        console.log(limitedDescription)
        
        datas['new_item_description'] = limitedDescription + '...'
        datas['new_item_title'] = limitItemTitle + '...'
        datas['timeremaining'] = timeremaining;
        if (chkfav) {
          console.log('this is a favorite')
          datas['isFavorite'] = chkfav.get('id');
        }
        // console.log(datas.id)
      });
    } else {
      data.forEach(async (datas) => {
        console.log('normal not logged user')
        //let chkfav = await this.favoriteService.checkIfFavorite(request.session.get('loggedUser').id, datas.id);
        // console.log('this is the auction_date', String(datas.auction_date))
        let timeremaining = await this.getRemainingHours(String(datas.auction_date), datas.id, datas.days_remaining)
        let limitedDescription = String(datas.item_description).substring(0, 100)
        let limitItemTitle = String(datas.item_title).substring(0, 50)
        console.log(limitedDescription)
        
        datas['new_item_description'] = limitedDescription + '...'
        datas['new_item_title'] = limitItemTitle + '...'
        datas['timeremaining'] = timeremaining;
        
        // console.log(datas.id)
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
    console.log('the country code');
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
    // console.log(data)
    let thePick = {}
    let getPick = await this.pickOfTheDayService.getOneBy('id', 1);
    if (getPick) {
      let viewPick = await this.auctionItemService.getPickOfTheDayItem(getPick.get('item_id_fk'));
      // console.log('pick of the day')
      // console.log(viewPick)
      thePick = viewPick.toJSON()
      // console.log(thePick)
    } else {
      console.log('error getting pick')
    }

    let searches = await this.popularSearchService.showSearches(20);
    let popularSearches = [];
    searches.forEach(items => {
      let jsonitem = items.toJSON();
      popularSearches.push(jsonitem)
    });
    console.log(data)
    // search return
    let catdesc;
    let cat = await this.categoryService.getOneBy('category_name', category)
    if (cat) {
      catdesc = cat.get('description')
    }
    return response.render('objects', { data, categories: categoryItems, sites, page, search, category, auction_house, offset, total, countries, country: convertedCountryName, relevance, itemFilter, user, browsing, thePick, popularSearches, catdesc });

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

  public async getRemainingHours(rawdate, id?:number, remdays?:number) {
    let hrnow = new Date();
    let timenow = moment().format('HH')
    console.log('the time now by moment', timenow, rawdate, id, remdays)
    console.log('this is a date too')
    let thistime = hrnow.getUTCHours();
    console.log(thistime)
    let splitdate = String(rawdate).split(' ');
    let gethrsmin = splitdate[1];
    let gethr = gethrsmin.split(':')
    let thehr = parseInt(gethr[0]);

    let remaining = thehr - timenow;
    console.log(timenow, thehr, remaining)
    if (remaining > 0) {
      return remaining;
    } else if (remaining < 0) {
      if (remdays <= 0) {
        console.log('this item should be in realized:', id)
        let toRealized = await this.auctionItemService.updateToRealized(id);
        if (toRealized) {
          console.log('item updated to realized:', id)
        }
      }
      
      
      return 0;
    } else {
      return 0;
    }

  }
}
