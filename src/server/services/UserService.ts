import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { User } from 'app/models';


@injectable
export class UserService extends SQLService<User> {

  protected modelClass = User;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

}
