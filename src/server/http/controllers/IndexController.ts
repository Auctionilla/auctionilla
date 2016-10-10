import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService, FavoriteService, PickOfTheDayService } from 'app/services';

@injectable
export class IndexController extends Controller {

  constructor(private auctionItemService: AuctionItemService, private favoriteService: FavoriteService, private pickOfTheDayService: PickOfTheDayService) {
    super();
  }

  public async index(request: Request, response: Response) {
    let today = new Date().toDateString();
    let pickDay = new Date()
    let current = pickDay.getFullYear() + '-' + pickDay.getMonth() + '-' + pickDay.getDate();


    let fav = await this.favoriteService.getFavorite();
    let pic = await this.pickOfTheDayService.getOneBy('id', 1);
    console.log('pic date');
    console.log(String(pic.get('updated_at')))
    let thepicdate = String(pic.get('updated_at'))
    console.log(current);
    console.log('the faveorite')
    console.log(fav.get('item'))
    console.log(fav.get('users'))
    if (thepicdate.indexOf(today) == -1) {
      let setPic = await this.pickOfTheDayService.setPickOfTheDay(fav.get('item'))
      if (setPic) {
        console.log('pick set!')
      }
    }

    // fav.forEach(items => {
    //   let jitem = items.toJSON();
    //   console.log(jitem)
    // });



    console.log(today);
    let getItems = await this.auctionItemService.getCountdownItems();
    let temp = [];
    getItems.forEach(items => {
      let jitem = items.toJSON();
      temp.push(jitem);
    });
    temp.forEach(async (datas) => {
      let date = String(datas['updated_at']);
      if (date.indexOf(today) == -1) {
        let id = datas['id'];
        let dec = await this.auctionItemService.decreaseDate(id, datas['converted_date']);
        if (dec) {
          console.log('nabawasan na');
        }
      }
    });
    return response.render('index');
  }
}
