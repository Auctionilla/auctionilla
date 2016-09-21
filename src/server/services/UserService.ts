import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Users } from 'app/models';


@injectable
export class UserService extends SQLService<Users> {

  protected modelClass = Users;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

}