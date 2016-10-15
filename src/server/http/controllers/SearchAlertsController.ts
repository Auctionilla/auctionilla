import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { SearchAlertsService } from 'app/services';


@injectable
export class SearchAlertsController extends Controller {

  constructor(private searchAlertsService: SearchAlertsService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }


  public async createSearchAlert(request: Request, response: Response) {
    let user;
    if (request.session.get('loggedUser')) {
      user = request.session.get('loggedUser').id;
      if (!user) {
        return response.redirect('/login')
      }
    }
    let auction_house = request.input.get('auction_house')
    // if (auction_house == 'all auction houses'){
    //   auction_house = '';
    // }
    let category = request.input.get('category');
    // if (category == 'all categories') {
    //   category = '';
    // }
    let data = {
      searchItem: String(request.input.get('search_item')).toLowerCase(),
      category: category,
      auctionHouse: auction_house,
      location: request.input.get('location'),
      user_id_fk: request.session.get('loggedUser').id
    }

    let checkIfExist = await this.searchAlertsService.checkIfAlertExist(data.user_id_fk, data.searchItem, data.category, data.location, data.auctionHouse)
    let datasearch = [];
    checkIfExist.forEach(item => {
      let js = item.toJSON();
      datasearch.push(js)
      console.log(js);
    })
    //console.log('the thing is existing', checkIfExist.get('id'))
    if (datasearch.length > 0) {


      console.log('search alert is already existing');
      return response.json({data: {alert: 'created'} });
    }


    let save = await this.searchAlertsService.saveSearchAlert(data);

    if (!save) {
      console.log('item saved')
    }

    console.log(data);
    return response.json({data: {alert: 'created'} });
  }

  // public async viewSearchAlert(request: Request, response: Response): Promise<any> {


  //  if (request.session.get('loggedUser')) {
  //    console.log ('user.id');
  //    console.log (request.session.get('loggedUser').id);
  //    let id = request.session.get('loggedUser').id;

  //   if (id) {
  //     let offset = 1;
  //     let limit = 10;
  //     console.log('view alerts')
  //     let searchAlerts = await this.searchAlertService.viewSearchAlerts(id, (offset - 1) * limit, limit);
  //     let alert = [];

  //     searchAlerts.forEach(item => {
  //       let jsonItem = item.toJSON();
  //       alert.push(jsonItem);
  //     });
  //     return response.render('profile', { data: alert });
  //     }
  //   } else {
  //     return response.redirect('/login');
  //   }
  //  }


  public async removeAlert(request: Request, response: Response) {
    let alertId = request.param('id');
    // console.log(alertId, 'alert id')
    let removeAlert = await this.searchAlertsService.destroy(parseInt(alertId));
    if (removeAlert) {
      console.log('alert removed')
    }
    return response.redirect('/viewprofile');
  }

   public async removeAlertFromNewPage(request: Request, response: Response) {
    let alertId = request.param('id');
    // console.log(alertId, 'alert id')
    let removeAlert = await this.searchAlertsService.destroy(parseInt(alertId));
    if (removeAlert) {
      console.log('alert removed')
    }
    return response.redirect('/viewmysearch-alerts');
  }

}
