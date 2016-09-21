import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';

@injectable
export class FavoriteController extends Controller {

  constructor() {
    super();
  }

  public async index(request: Request, response: Response) {
    return response.render('index');
  }
}
