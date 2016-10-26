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

  createUser(data) {
    return this.create({
      validation_code: data.code,
      email: data.email,
      password: data.password
    });
  }

  verifyUser(id) {
    return this.update(id, {
      email_confirmed: true
    });
  }

  checkEmail(email) {
    return this.query(query => {
      query.where('email', email)

    }).getOne();
  }



}
