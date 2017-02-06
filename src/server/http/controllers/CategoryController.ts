import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { CategoryService, AuctionItemService } from 'app/services';

@injectable
export class CategoryController extends Controller {

  constructor(private categoryService:CategoryService, private auctionItemService: AuctionItemService) {
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

  public async showCategories(request: Request, response: Response) {
    let user = "";
    if (request.session.get('loggedUser')) {
      let loggedUserId = request.session.get('loggedUser').id;
      console.log('this is the logged user id');
      console.log(loggedUserId);
      user = loggedUserId;
    }
    let categories = await this.categoryService.getAllCategories();
    let category = [];
    categories.forEach(async(items) => {
      let jsonItem = items.toJSON();
      let image = await this.auctionItemService.getMostPopularItemByCategory(parseInt(jsonItem['id']));
      if(image) {
        jsonItem['popularImage'] = image.get('item_image');
      }
      
      category.push(jsonItem);
    });
    await this.auctionItemService.getMostPopularItemByCategory(1);
    return response.render('categories', { data: category, user });
  }

  public async searchCategories(request: Request, response: Response) {
    let search = request.input.get('search');
    let offset = parseInt(request.input.get('offset'));
    let limit = parseInt(request.input.get('limit'));
    let categories = await this.categoryService.searchCategory(search, offset, limit);
    let category = [];
    categories.forEach(async(items) => {
      let jsonItem = items.toJSON();
      let image = await this.auctionItemService.getMostPopularItemByCategory(parseInt(jsonItem['id']));
      if(image) {
        jsonItem['popularImage'] = image.get('item_image');
      }
      
      category.push(jsonItem);
    });
    await this.auctionItemService.getMostPopularItemByCategory(1);
    return response.json({ data: category });
  }


}
