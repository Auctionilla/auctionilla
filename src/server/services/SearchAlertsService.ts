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

}