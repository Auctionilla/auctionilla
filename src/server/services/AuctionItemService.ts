import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { AuctionItem } from 'app/models';


@injectable
export class AuctionItemService extends SQLService<AuctionItem> {

  protected modelClass = AuctionItem;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  searchAuction(searchItem = '', category, auction_house, country, relevance, item_filter, offset?: number, itemPerPage?: number) {
    return this.query(query => {

      query.select('auction_items.*')
      query.select('c.category_name')
      query.select('h.site_name')
      query.select('h.site_emblem')
      query.select('h.site_url')
      query.select(this.db.connection().raw('datediff(auction_date, curdate()) as days_remaining'))
      query.join('categories as c', function () {
          this.on('c.id', '=', 'auction_items.category_id_fk');
      });
      query.join('auction_site as h', function () {
          this.on('h.id', '=', 'auction_items.auction_site_fk');
      });


      if (auction_house && auction_house != 'all auction houses') {
        query.where('site_name', auction_house);
      }
      if (country && country != 'All Countries') {
        query.where('location', country)
      }
      if (category && category != 'all categories') {
       query.where('category_name', category)
      }
      query.where('item_title', 'like',  `%${searchItem}%`);
      if (relevance) {
        if (relevance == 'latest') {
          query.orderBy('id', 'desc');
        } else if (relevance == 'shortest-remaining') {
          query.orderBy('auction_items.converted_date', 'asc');
        } else if (relevance == 'lowest-price') {
          query.orderBy('auction_items.price', 'asc');
        } else if (relevance == 'highest-price') {
          query.orderBy('auction_items.price', 'desc');
        } else if (relevance == 'relevance') {
          query.orderBy('auction_items.id', 'asc');
        }
      }

      if (item_filter) {
        if (item_filter == 'objects') {
          query.whereIn('price_status', ['Low estimate', 'Fix price']);
        } else if (item_filter == 'fix-price') {
          query.where('price_status', 'Fix price')
        } else if (item_filter == 'realized') {
          query.whereIn('price_status', ['Hammer price', 'Realized'] )
        }
      }

      if (offset) {
       query.offset(offset)
      }
      if (itemPerPage) {
        query.limit(itemPerPage)
      }
    }).get();
  }

  getSearchItemCount(searchItem = '', category, auction_house, country, item_filter) {

    return this.query(query => {
      query.count('auction_items.item_title as total')
      query.join('categories as c', function () {
          this.on('c.id', '=', 'auction_items.category_id_fk');
      });
      query.join('auction_site as h', function () {
          this.on('h.id', '=', 'auction_items.auction_site_fk');
      });
      if (auction_house && auction_house != 'all auction houses') {
        query.where('site_name', auction_house);
      }
      if (country && country != 'All Countries') {
        query.where('location', country)
      }
      if (category && category != 'all categories') {
       query.where('category_name', category)
      }

      if (item_filter) {
        if (item_filter == 'objects') {
          query.whereIn('price_status', ['Low estimate', 'Fix price']);
        } else if (item_filter == 'fix-price') {
          query.where('price_status', 'Fix price')
        } else if (item_filter == 'realized') {
          query.whereIn('price_status', ['Hammer price', 'Realized'] )
        }
      }

      query.where('item_title', 'like',  `%${searchItem}%`);


    }).getOne();
  }

  getPickOfTheDayItem(id) {
    return this.query(query => {
      query.select('auction_items.*')
      query.select('c.category_name')
      query.select('h.site_name')
      query.select('h.site_emblem')
      query.select('h.site_url')
      query.join('categories as c', function () {
          this.on('c.id', '=', 'auction_items.category_id_fk');
      });
      query.join('auction_site as h', function () {
          this.on('h.id', '=', 'auction_items.auction_site_fk');
      });
      query.where('auction_items.id', id);
    }).getOne();
  }


  getCountryHits(item) {
    return this.query(query => {
      query.count('location')
      query.where('item_title', 'like' , `%${item}%`)
    });
  }

  decreaseDate(id , date) {
    return this.update(id, {
      converted_date: date - 24

    });
  }

  getCountdownItems() {
    return this.query(query => {

      query.where('converted_date','>', 0);
    }).get();
  }



  addAuctionItem(data){
    return this.create({
      item_title: data.item_title,
      item_description: data.item_desc,
      auction_url: data.auction_url,
      item_image: data.item_image,
      price_status: data.price_status,
      price: data.price,
      currency: data.currency,
      location: data.location,
      auction_date: data.auction_date,
      category_id_fk: data.category_id,
      auction_site_fk: data.auction_site
    });
  }


  incrementFavorite(item_id) {
    return this.increment(item_id, 'favorites_count', 1)
  }

  decrementFavorite(item_id) {
    return this.decrement(item_id, 'favorites_count', 1)
  }

  addHours(hours) {

     return this.query(query => {
       query.select(this.db.connection().raw('date_add(curdate(), interval ? hour) as newdate',[hours]))
     }).getOne();
  }

  addDate(val) {

    return this.update(1, {
      auction_date: val

    })
  }




}
