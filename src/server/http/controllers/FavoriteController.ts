import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { FavoriteService } from 'app/services';

@injectable
export class FavoriteController extends Controller {

  constructor(private favoriteService: FavoriteService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }


  public async addFavorite(request: Request, response: Response ) {
    let id = request.input.get('item_id');
    console.log('this is the item id');
    console.log(id);
    let data = {
      user_id: 1,
      item_id: id
    }
    console.log(data)
    let createFav = await this.favoriteService.createFavorite(data);
    console.log('create the fav')
    console.log(createFav.getId())
    return response.json({ data: 'added favorite', favId: createFav.getId()});
  }

  public async removeFavorite(request: Request, response: Response) {
    let id = request.input.get('favid');
    console.log('this is the fav id to delete');
    console.log(id);
    await this.favoriteService.remvoveFavorite(id);
    return response.json({data: 'remove favorite'});
  }

  public async checkFavorite(request: Request, response: Response) {
    let item_id = request.input.get('itemid');
    console.log(item_id)

  }


}
