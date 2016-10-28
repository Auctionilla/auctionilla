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

  searchAuction(searchItem = '', category, offset?: number, itemPerPage?: number) {
    return this.query(query => {
       query.select('auction_items.*')
       query.select('c.category_name')
       query.join('categories as c', function () {
            this.on('c.id', '=', 'auction_items.category_id_fk');
       });
       if (category) {
         query.where('category_name', 'like', `%${searchItem}%`)
       }
       query.where('item_title', 'like',  `%${searchItem}%`)
       if (offset) {
         query.offset(offset)
       }
       if (itemPerPage) {
          query.limit(itemPerPage)
       }




     }).get();
  }

  getSearchItemCount(searchItem = ''){
    return this.query(query => {
      query.count('item_title as total')
      query.where('item_title','like', `%${searchItem}%`)
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
