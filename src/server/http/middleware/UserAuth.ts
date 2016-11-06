import { HttpMiddleware, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';

@injectable
export class UserAuth extends HttpMiddleware {

  public async handle(request: Request, response: Response, next: Function) {

    if (request.session.get('loggedUser')) {
      let user = request.session.get('loggedUser').id;
      if (!user) {
        console.log('user is not logged in');
        console.log(user);
        return response.redirect('/login');
      } else {
        console.log('user logged in');
        console.log(user);
      }
    }

    next();
  }
}
