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

  removeFavorite(id) {
    return this.destroy(id)
  }

  checkIfFavorite(user_id, item_id) {
    return this.query(query => {
      query.where('user_id_fk', user_id)
      query.where('item_id_fk', item_id)
    }).getOne();
  }

  getFavorite() {
     return this.query(query => {
       query.select('item_id_fk as ite`m')
       query.count('user_id_fk as users')
       query.groupByRaw('item_id_fk')
       query.orderBy('users', 'desc')
     }).getOne();
  }
  // SELECT item_id_fk as item ,COUNT(user_id_fk) As 'users' FROM favorites group by item_id_fk order by users desc;

  // viewFavorites(id, offset?: number, limit?: number){
  //   return this.query(query => {
  //     query.select('favorites.id as favId')
  //     query.select('ai.*')
  //     query.join('users as u', function () {
  //       this.on('u.id', '=', 'favorites.user_id_fk')
  //     });
  //     query.join('auction_items as ai', function() {
  //       this.on('ai.id', '=', 'favorites.item_id_fk')
  //     });
  //     query.where('favorites.user_id_fk', id)

  //     query.offset(offset);
  //     query.limit(limit);
  //   }).get();
  // }

  countFavorites(id){
    return this.query(query => {
      query.count('favorites.user_id_fk as totalFav')
      query.where('favorites.user_id_fk', id)
    }).getOne();
  }

  viewFavorites(id, offset?: number, limit?: number) {
    return this.query(query => {
       query.select('favorites.id as favId')
       query.select('ai.*')
       query.select('as.site_emblem')
       query.select(this.db.connection().raw('datediff(ai.auction_date, curdate()) as days_remaining'))
       query.join('users as u', function () {
         this.on('u.id', '=', 'favorites.user_id_fk')
       });
       query.join('auction_items as ai', function() {
         this.on('ai.id', '=', 'favorites.item_id_fk')
       });
       query.join('auction_site as as', function () {
         this.on('as.id', '=', 'ai.auction_site_fk')
       });
       query.where('favorites.user_id_fk', id)
       if (offset) {
         query.offset(offset);
       }
       if (limit) {
         query.limit(limit);
       }
    }).get();
  }

  removeFavoriteAll(id){
    return this.destroy(id);
  }
}
