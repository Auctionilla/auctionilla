import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { CategoryService } from 'app/services';

@injectable
export class CategoryController extends Controller {

  constructor(private categoryService:CategoryService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }

  public async getCategories(request: Request, response: Response) {
    let categories = await this.categoryService.getAllCategories();
    let category = [];
    categories.forEach(items => {
      let jsonItem = items.toJSON();
      console.log(jsonItem);
      category.push(jsonItem);
    });
    return response.json({ data: category });
  }

}
