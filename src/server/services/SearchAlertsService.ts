import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { SearchAlerts } from 'app/models';


@injectable
export class SearchAlertsService extends SQLService<SearchAlerts> {

  protected modelClass = SearchAlerts;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  saveSearchAlert(data) {
    return this.create({
      search_item: data.searchItem,
      category: data.category,
      auction_house: data.auctionHouse,
      location: data.location,
      user_id_fk: data.user_id_fk
    });
  } 

  viewSearchAlerts(id, offset?: number, limit?: number){
   return this.query (query => {
      query.select('search_alerts.*')
      query.select('u.country')
      query.select('search_alerts.id as alertId')
      query.join('users as u', function () {
        this.on('u.id', '=', 'search_alerts.user_id_fk');
      });
      query.where('search_alerts.user_id_fk', id)
      query.offset(offset);
      query.limit(limit);
    }).get();
  }

  viewAllSearchAlerts(id) {
    return this.query (query => {
      query.select('search_alerts.*')
      query.select('u.*')
      query.select('search_alerts.id as alertId')
      query.join('users as u', function () {
        this.on('u.id', '=', 'search_alerts.user_id_fk');
      });
      query.where('search_alerts.user_id_fk', id)
    }).get();
  }

  countSavedSearch(id) {
    return this.query(query => {
      query.count('search_alerts.user_id_fk as totalSearch')
      query.where('search_alerts.user_id_fk', id)
    }).getOne();
  }

   deleteSearchAlerts (id){
    return this.destroy(id)
  }

}
