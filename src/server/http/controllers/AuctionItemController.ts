import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService } from 'app/services';


@injectable
export class AuctionItemController extends Controller {

  constructor(private auctionItemService: AuctionItemService) {
    super();
  }

  public async index(request: Request, response: Response) {

    return response.render('index');
  }


  public async listItems(requst: Request, response: Response) {
    let items = await this.auctionItemService.searchAuction('', '', 100);
    console.log(items);
    return response.render('/index', { data: items });
  }

}
