import { HttpMiddleware, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';

@injectable
export class UserAuth extends HttpMiddleware {

  public async handle(request: Request, response: Response, next: Function) {

    let user = request.session.get('loggedUser');
    console.log(request.session);
    if (!user) {
      console.log('user is not logged in');
      return response.redirect('/');
    } else {
      console.log('user logged in');
    }
    next();
  }
}
