import { SQLModel } from 'chen/sql';
import { User } from 'app/models';
export class SearchAlerts extends SQLModel {

  protected table: string = 'search_alerts';
  protected fillable:string[] = ['search_item', 'auction_house', 'category', 'location', 'user_id_fk'];

  user() {
    return this.belongsTo(User, 'user_id_fk');
  }
}
