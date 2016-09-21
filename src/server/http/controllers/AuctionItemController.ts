import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService } from 'app/services';
import { User } from 'app/models';

@injectable
export class AuctionItemController extends Controller {

  constructor(private auctionItemService: AuctionItemService) {
    super();
  }

  public async index(request: Request, response: Response) {
    let a = await this.auctionItemService.getAll();
    console.log(a);
    console.log("this is the result");
    let categorize = true;
    console.log(categorize);
    return response.render('auctionpage');
  }
}
