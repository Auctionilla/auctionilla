import { SQLModel } from 'chen/sql';
import { AuctionItem } from 'app/models';

export class Category extends SQLModel {

  protected table: string = 'categories';
  protected fillable:string[] = ['category_name', 'description'];

  auctionItems() {
    return this.hasMany(AuctionItem, 'category_id_fk');
  }

}
