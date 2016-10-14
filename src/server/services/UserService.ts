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

  updateUser(id, data){
    return this.update(id, {
      first_name : data.first_name,
      last_name : data.last_name,
      city : data.city,
      country : data.country,
      phone : data.phone,
      password : data.password
    });
  }

  getOldPassword(id) {
    return this.query(query => {
      query.select('users.password')
      query.where('id', id)
    }).getOne();
  }

    
  deactivateMyAccount(id) {
    return this.update(id, {
      is_active: 0
    });
  }

  reactivateMyAccount(email) {
    return this.query(query => {
      query.where('email', email);
    }).update({ is_active: 1 });
  }

  getUserUpdate(id) {
    return this.query(query => { 
      query.select ('*')
      query.where('id', id)
    }).get();
  }

  deleteAccount(id) {
    return this.destroy(id)
  }



}
