import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Favorite } from 'app/models';


@injectable
export class FavoriteService extends SQLService<Favorite> {

  protected modelClass = Favorite;
  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  createFavorite(data) {//,.<>
    return this.create({
      user_id_fk: data.user_id,
      item_id_fk: data.item_id
    })
  }

  remvoveFavorite(id) {
    return this.destroy(id)
  }

  checkIfFavorite(user_id, item_id) {
    return this.query(query => {
      query.where('user_id_fk', user_id)
      query.where('item_id_fk', item_id)
    }).getOne();
  }

}
