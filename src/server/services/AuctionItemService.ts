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

  searchAuction(searchItem = '', category, auction_house, offset?: number, itemPerPage?: number) {
    return this.query(query => {

      query.select('auction_items.*')
      query.select('c.category_name')
      query.select('h.site_name')
      //query.distinct('f.user_id_fk')
      query.join('categories as c', function () {
          this.on('c.id', '=', 'auction_items.category_id_fk');
      });
      query.join('auction_site as h', function () {
          this.on('h.id', '=', 'auction_items.auction_site_fk');
      });
      // query.leftJoin('favorites as f', function () {
      //     this.on('f.item_id_fk', '=', 'auction_items.id');
      //      where ('f item_id_fk' user_id)
      // });
      if (auction_house) {
        query.where('site_name', auction_house);
      }
      if (category) {
       query.where('category_name', category)
      }
      query.where('item_title', 'like',  `%${searchItem}%`)
      if (offset) {
       query.offset(offset)
      }
      if (itemPerPage) {
        query.limit(itemPerPage)
      }
    }).with('favorite').get();
  }

  getSearchItemCount(searchItem = '', category, auction_house, offset?: number, itemPerPage?: number){
    // return this.query(query => {
    //   query.count('item_title as total')
    //   query.where('item_title','like', `%${searchItem}%`).,><
    // }).getOne();
    return this.query(query => {
      query.count('auction_items.item_title as total')
      query.join('categories as c', function () {
          this.on('c.id', '=', 'auction_items.category_id_fk');
      });
      query.join('auction_site as h', function () {
          this.on('h.id', '=', 'auction_items.auction_site_fk');
      });
      if (auction_house) {
        query.where('site_name', auction_house);
      }
      if (category) {
       query.where('category_name', category);
      }
      query.where('item_title', 'like',  `%${searchItem}%`);
      // if (offset) {
      //  query.offset(offset)
      // }
      // if (itemPerPage) {
      //   query.limit(itemPerPage)
      // }
    }).getOne();
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





}
