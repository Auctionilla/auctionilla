import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { SearchAlertsService } from 'app/services';

@injectable
export class SearchAlertsController extends Controller {

  constructor(private searchAlertService: SearchAlertsService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }


  public async createSearchAlert(request: Request, response: Response) {
    let data = {
      searchItem: request.input.get('search_item'),
      category: request.input.get('category'),
      auctionHouse: request.input.get('auction_house'),
      location: request.input.get('location'),
      user_id_fk: request.session.get('loggedUser').id
    }
    console.log(data)
    let save = await this.searchAlertService.saveSearchAlert(data);
    console.log(save);
    if (!save) {
      console.log('item saved')
    }

    console.log(data);
    return response.json({data: {alert: 'created'} });
  }
}
