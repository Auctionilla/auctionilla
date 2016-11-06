import { HttpMiddleware, Request, Response } from 'chen/web';
import { injectable } from 'chen/core';

@injectable
export class AlreadyLogged extends HttpMiddleware {

  public async handle(request: Request, response: Response, next: Function) {

    if (request.session.get('loggedUser').id) {
      console.log('user is already logged in')
      let user = request.session.get('loggedUser').id;
      if (user) {
        console.log('user is logged in');
        console.log(user);
        return response.redirect('/');
      } else {
        console.log('user is not logged in');
        console.log(user);
      }
    }

    next();
  }
}
