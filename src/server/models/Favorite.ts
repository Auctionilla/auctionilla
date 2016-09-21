import { SQLModel } from 'chen/sql';
import { User ,AuctionItem } from 'app/models';

export class Favorites extends SQLModel {

  protected table: string = 'favorites';
  protected fillable:string[] = ['user_id_fk', 'item_id_fk'];

  user(){
    return this.belongsTo(User, 'user_id_fk')
  }

  auctionItem(){
    return this.belongsTo(AuctionItem, 'auction_id_fk');
  }
}
