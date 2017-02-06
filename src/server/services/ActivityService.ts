import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Activity } from 'app/models';


@injectable
export class ActivityService extends SQLService<Activity> {

  protected modelClass = Activity;
  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }



}
