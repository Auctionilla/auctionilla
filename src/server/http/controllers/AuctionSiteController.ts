import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { AuctionSiteService } from 'app/services';

@injectable
export class AuctionSiteController extends Controller {

  constructor(private auctionSiteService: AuctionSiteService) {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }

  public async getAllAuctionSite(request: Request, response: Response) {
    let sites = await this.auctionSiteService.getAll();
    let site = [];
    sites.forEach(items => {
      let jsonItem = items.toJSON();
      site.push(jsonItem);
    });
    return response.json({ data: site });
  }
}
