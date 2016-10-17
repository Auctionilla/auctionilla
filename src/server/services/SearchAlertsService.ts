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
      query.orderBy('search_alerts.created_at', 'desc')
    }).get();
  }

  viewAllSearchAlerts(id, offset?: number, limit?: number) {
    return this.query (query => {
      query.select('search_alerts.*')
      query.select('u.country')
      query.select('search_alerts.id as alertId')
      query.join('users as u', function () {
        this.on('u.id', '=', 'search_alerts.user_id_fk');
      });
      if (offset) {
        query.offset(offset)
      }
      if (limit) {
        query.limit(limit)
      }
      query.where('search_alerts.user_id_fk', id)
      query.orderBy('search_alerts.id', 'desc')
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

  checkIfAlertExist (id, name, category, location, auction_site) {
    return this.query(query => {
      // if (name) {
      //   query.andWhere('search_item', name);
      //  }
      // if (category) {
      //   query.andWhere('category', category);
      // }
      // if (location) {
      //   query.andWhere('location', location);
      // }
      // if (auction_site) {
      //   query.andWhere('auction_house', auction_site)
      // }


      query.where('search_item', name)
      query.where('category', category)
      query.where('auction_house', auction_site)
      query.where('location', location)
      query.where('user_id_fk', id)
    }).get();
  }

}
