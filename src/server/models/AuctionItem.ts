import { SQLModel } from 'chen/sql';
import { Category, AuctionSite } from 'app/models';

export class AuctionItem extends SQLModel {

  protected table: string = 'auction_items';
  protected fillable:string[] = ['item_title', 'item_description', 'auction_url', 'item_image', 'price_status', 'price', 'currency', 'location', 'auction_date', 'category_id_fk', 'auction_site_fk'];

  category() {
    return this.belongsTo(Category, 'category_id_fk');
  }

  auctionSite() {
    return this.belongsTo(AuctionSite, 'auction_site_fk');
  }



}
