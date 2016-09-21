import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { AuctionSite } from 'app/models';


@injectable
export class AuctionSiteService extends SQLService<AuctionSite> {

  protected modelClass = AuctionSite;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

}
