import { Router } from 'chen/web';
import { Config } from 'chen/core';

export default function (router: Router, config: Config) {

  //router.route('GET', '/', 'IndexController@index');
  router.route('GET', '/', 'AuctionItemController@listItems');
  router.route('POST', '/register', 'UserController@register');
  router.route('GET', '/registration', 'UserController@registration');
  router.route('GET', '/verify-account/:verification_code/:id', 'UserController@verifyAccount');
  router.route('POST', '/login', 'UserController@login');
  router.route('GET', '/login', 'UserController@viewLogin');
  router.route('GET', '/search', 'AuctionItemController@searchItem');
  router.route('GET', '/getcategories', 'CategoryController@getCategories');



  router.group({middleware: ['UserAuth']}, route => {
    router.route('POST', '/create-searchalert', 'SearchAlertsController@createSearchAlert');
    router.route('GET', '/logout', 'UserController@logout');
    router.route('POST', '/addfavorite', 'FavoriteController@addFavorite');
    router.route('POST', '/removefavorite', 'FavoriteController@removeFavorite');
  });



}
