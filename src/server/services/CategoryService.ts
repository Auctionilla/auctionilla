import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Category } from 'app/models';


@injectable
export class CategoryService extends SQLService<Category> {

  protected modelClass = Category;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

}