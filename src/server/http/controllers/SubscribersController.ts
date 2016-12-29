import { Controller, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';
import { SubscribersService } from 'app/services';

@injectable
export class SubscribersController extends Controller {

  constructor(private subscribersService: SubscribersService) {
    super();
  }

  public async index(request: Request, response: Response) {

    return response.render('index');
  }

  public async create(request: Request, response: Response) {
  	let email = request.input.get('email');
  	console.log('the email', JSON.stringify(email));
  	if(!email) {
  		return response.json({alert: '<b>Warning! </b>Please use a valid email'});
  	}
  	let chkEmail = await this.subscribersService.getOneBy('email', email)
  	if(chkEmail) {
  		return response.json({alert: '<b>Failed! </b>This email is already registered.'})
  	}
  	let save = await this.subscribersService.createSubscriber(email);
  	if(!save) {
  		return response.json({alert: '<b>Warning! </b>Please use a valid email'});
  	}
  	return response.json({alert: `<b>Thanks for subscribing</b> you'll be receiving our updates soon.`});
  }
}
