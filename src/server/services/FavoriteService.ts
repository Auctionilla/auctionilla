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

}
