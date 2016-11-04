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



}
