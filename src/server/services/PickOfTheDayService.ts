import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { PickOfTheDay } from 'app/models';


@injectable
export class PickOfTheDayService extends SQLService<PickOfTheDay> {

  protected modelClass = PickOfTheDay;
  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }


  setPickOfTheDay(id) {
    return this.update(1, {
      item_id_fk: id,
    })
  }



}
