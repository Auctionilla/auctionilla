import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionItemService, MandrillService } from 'app/services';

@injectable
export class AuctionItemController extends Controller {

  constructor(private auctionItemService: AuctionItemService, private mandrillService: MandrillService) {
    super();
  }

  public async index(request: Request, response: Response) {
    let a = await this.auctionItemService.getAll();
    console.log(a);
    console.log("this is the result");
    let sendEmail = this.mandrillService.send('subject', 'msg', [{ email: 'cedrickbuan@gmail.com' }], '');
    console.log(sendEmail);

    return response.render('auctionpage');
  }
}
