import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Subscribers } from 'app/models';


@injectable
export class SubscribersService extends SQLService<Subscribers> {

  protected modelClass = Subscribers;
  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  createSubscriber(email) {
    return this.create({
      email: email
    });
  }

}
