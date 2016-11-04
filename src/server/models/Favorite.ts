import { SQLModel } from 'chen/sql';
import { User } from 'app/models';

export class Favorite extends SQLModel {

  protected table: string = 'favorites';
  protected fillable:string[] = ['user_id_fk', 'item_id_fk'];

  user(){
    return this.belongsTo(User, 'user_id_fk')
  }


}
