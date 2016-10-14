import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { FavoriteService, AuctionItemService } from 'app/services';

@injectable
export class FavoriteController extends Controller {

  constructor(private favoriteService: FavoriteService, private auctionItemService: AuctionItemService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }


  public async addFavorite(request: Request, response: Response ) {
    if (request.session.get('loggedUser')) {
      let user = request.session.get('loggedUser').id;
      if (!user) {
        return response.redirect('/login')
      }
    }

    let user = 0;
    if (request.session.get('loggedUser')) {
      let loggedUserId = request.session.get('loggedUser').id;
      console.log('this is the logged user id');
      console.log(loggedUserId);
      user = loggedUserId;
    }
    let id = request.input.get('item_id');
    let decreaseFavoriteCount = await this.auctionItemService.incrementFavorite(id)
    if (decreaseFavoriteCount) {
      console.log('decrease item count')
    }
    console.log('this is the item id');
    console.log(id);
    let data = {
      user_id: user,
      item_id: id
    }
    console.log(data)
    let createFav = await this.favoriteService.createFavorite(data);
    console.log('create the fav')
    console.log(createFav.getId())
    return response.json({ data: 'added favorite', favId: createFav.getId()});
  }

  public async removeFavorite(request: Request, response: Response) {
    if (request.session.get('loggedUser')) {
      let user = request.session.get('loggedUser').id;
      if (!user) {
        return response.redirect('/login')
      }
    }

    let id = request.input.get('favid');
    let fetchFavorite = await this.favoriteService.getOneBy('id', id)
    let item_id = fetchFavorite.get('item_id_fk')
    let decreaseFavCount = await this.auctionItemService.decrementFavorite(item_id)
    if (decreaseFavCount) {
      console.log('decreate item favorite count')
    }
    console.log('this is the fav id to delete');
    console.log(id);
    await this.favoriteService.remvoveFavorite(id);
    return response.json({ data: 'remove favorite' });
  }

  public async checkFavorite(request: Request, response: Response) {
    let item_id = request.input.get('itemid');
    console.log(item_id)

  }

  public async removeFavoriteFromProfile(request: Request, response:Response) {
    let id = request.input.get('favId');
    // console.log('this is the fav id to delete');
    // console.log(id);
    await this.favoriteService.remvoveFavorite(id);
    return response.redirect('/viewprofile');
  }


}
