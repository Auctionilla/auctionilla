import { Controller, Request, Response } from 'chen/web';
import { injectable, _ } from 'chen/core';
import { AuctionItemService, FavoriteService, PickOfTheDayService, CategoryService } from 'app/services';

@injectable
export class IndexController extends Controller {

  constructor(private categoryService:CategoryService ,private auctionItemService: AuctionItemService, private favoriteService: FavoriteService, private pickOfTheDayService: PickOfTheDayService) {
    super();
  }

  public async index(request: Request, response: Response) {
    let today = new Date().toDateString();
    // let pickDay = new Date()
    // let current = pickDay.getFullYear() + '-' + pickDay.getMonth() + '-' + pickDay.getDate();
    if (request.session.get('updateAlert')) {
      request.session.flash('updateAlert');
    }
    // let randomnum = _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // console.log('this is a ramdom number', randomnum)


    let fav = await this.favoriteService.getFavorite();
    let pic = await this.pickOfTheDayService.getOneBy('id', 1);
    // console.log('pic date');
    // console.log(String(pic.get('updated_at')))
    let newpicid;// = fav.get('item');
    let thepicdate;
    if (fav) {
       newpicid = fav.get('item');
    } else {
      newpicid = 1;
      console.log('no pick of the day yet . default to 1')
      let data = {
        item_id_fk: 1
      }
      let setPic = await this.pickOfTheDayService.create(data);
      if (setPic) {
        console.log('pick set!')
      }else {
        console.log('set pick error')
      }
    }

    if (pic) {
      thepicdate = String(pic.get('updated_at'))
    } else {
      thepicdate = today
    }
    console.log('current fav date')
    console.log(thepicdate);
    console.log('the faveorite')
    //console.log(fav.get('item'))
    //console.log(fav.get('users'))
    console.log('today');
    console.log(today)
    if (thepicdate.indexOf(today) == -1) {
      console.log('not match date')
      let viewcurrent = await this.pickOfTheDayService.getOneBy('id', 1)
      if (!viewcurrent) {
        if (viewcurrent.get('id')) {
          console.log('pick emtpty')
        }
        
      }
      console.log('current favorite', viewcurrent.get('item_id_fk'))
      if (newpicid == viewcurrent.get('item_id_fk')) {
        console.log('still the same item')
        newpicid = _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
      let setPic = await this.pickOfTheDayService.setPickOfTheDay(newpicid);
      if (setPic) {
        // let theitemid = fav.get('id')
        // console.log('the pick of the day', fav.get('user_id_fk'), theitemid)
        console.log('pick set!')
      }
    } else {
      console.log('date matched')
    }

    // fav.forEach(items => {
    //   let jitem = items.toJSON();
    //   console.log(jitem)
    // });



    console.log(today);
    // let c = await this.auctionItemService.addHours(34);
    //console.log('this is the date', c.get('newdate'))
    // let d = await this.auctionItemService.addDate(c.get('newdate'));
    // if (d) {
    //   console.log(d)
    // }

    // let getItems = await this.auctionItemService.getCountdownItems();
    // let temp = [];
    // getItems.forEach(items => {
    //   let jitem = items.toJSON();
    //   temp.push(jitem);
    // });
    // temp.forEach(async (datas) => {
    //   let date = String(datas['updated_at']);
    //   if (date.indexOf(today) == -1) {
    //     let id = datas['id'];
    //     let dec = await this.auctionItemService.decreaseDate(id, datas['converted_date']);
    //     if (dec) {
    //       console.log('nabawasan na');
    //     }
    //   }
    // });
    let popularRealizedCategory = await this.auctionItemService.getCategoryByPopularityRealized()
    let popularRealized = [];
    popularRealizedCategory.forEach(item => {
      let jsonItem = item.toJSON();
      console.log(jsonItem)
      popularRealized.push(jsonItem);
    });
    popularRealized.forEach( async(real) => {
      let getMostPopularItem = await this.auctionItemService.getMostPopularByCategory(real['category'], 'realized')
      let thepo = getMostPopularItem.get('item_image')
      if (getMostPopularItem) {
         real['mostPopularItemImage'] = thepo
      }
      let t = await this.auctionItemService.getItemCountByCategory(real['category'], 'realized')
      let thetotal = t.get('total')
      if (t) {
        real['itemcount'] = thetotal
      }
      let mostexp = await this.auctionItemService.getMostExpensive(real['category'], 'realized')
      if (mostexp) {
        real['mostExpensive'] = mostexp.get('price')
        real['currency'] = mostexp.get('currency')
      }
      let categoryDetails = await this.categoryService.getOneBy('id', real['category'])
      if (categoryDetails) {
        real['categoryName'] = categoryDetails.get('category_name')
        real['description'] = categoryDetails.get('description')
      }
    });

    let popularCategory = await this.auctionItemService.getCategoryByPopularity();
    let popularCateg = [];
    popularCategory.forEach(item => {
      let jdata = item.toJSON();
      popularCateg.push(jdata);
    });

    popularCateg.forEach( async(datas) => {
      let getMostPopularItem = await this.auctionItemService.getMostPopularByCategory(datas['category'])
      let thepo = getMostPopularItem.get('item_image')
      if (getMostPopularItem) {
         datas['mostPopularItemImage'] = thepo
      }
      let t = await this.auctionItemService.getItemCountByCategory(datas['category'])
      let thetotal = t.get('total')
      if (t) {
        datas['itemcount'] = thetotal
      }
      let mostexp = await this.auctionItemService.getMostExpensive(datas['category'])
      if (mostexp) {
        datas['mostExpensive'] = mostexp.get('price')
        datas['currency'] = mostexp.get('currency')
      }
      let categoryDetails = await this.categoryService.getOneBy('id', datas['category'])
      if (categoryDetails) {
        datas['categoryName'] = categoryDetails.get('category_name')
        datas['description'] = categoryDetails.get('description')
      }
    });


    let user;
    if (request.session.get('loggedUser')) {
      user = request.session.get('loggedUser').id;
      console.log('logged user id:', user)
    }
    await this.auctionItemService.getItemCountByCategory(1);
    await this.auctionItemService.getMostExpensive(1)
    await this.categoryService.getOneBy('id', 1)
    await this.auctionItemService.getMostPopularByCategory(1);

    // console.log('item count: ', o.get('total'))
    console.log('this is the new data array:')
    console.log(popularRealized)
    return response.render('index', { user, popularCateg, popularRealized });
  }




}
