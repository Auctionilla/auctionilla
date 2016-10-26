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

  searchAuction(searchItem = '', offset, itemPerPage){
    return this.query(query => {
       query.select('auction_item.*')
       query.select('c.category')
       query.join('category as c', function () {
            this.on('c.id', '=', 'auction_item.category_id_fk');
       });
       query.where('item_title', 'like',  `%${searchItem}%`)
       if (itemPerPage) {
          query.limit(itemPerPage)
       }
       if (offset) {
         query.offset(offset)
       }



     }).get();
  }

  getSearchItemCount(searchItem){
    return this.query(query => {
      query.select('count(*) as count')
      query.where('item_title','like', `%${searchItem}%`)
    }).getOne();
  }





}
