import { Router } from 'chen/web';
import { Config } from 'chen/core';

export default function (router: Router, config: Config) {

  //router.route('GET', '/', 'IndexController@index');
  router.route('GET', '/', 'AuctionItemController@index');
  //router.route('POST', '/', 'AuctionListController@searchAuction');
  router.route('POST', '/register', 'UserController@register');
  router.route('GET', '/verify-account/:verification_code/:id', 'UserController@verifyAccount');
  router.route('POST', '/login', 'UserController@login');
  router.route('GET', '/login', 'UserController@viewLogin');
  // router.route('GET', '/auction/page-offset/:offset/:page', 'AuctionItemController@listItems');
  // router.route('GET', '/auction/page-offset/:offset/:page/:searchItem', 'AuctionItemController@listItems');
  // router.route('POST', '/auction/search', 'AuctionItemController@listItems');
  router.route('GET', '/search', 'AuctionItemController@searchItem');
  router.route('GET', '/getcategories', 'CategoryController@getCategories');



  router.group({middleware: ['UserAuth']}, route => {
    router.route('POST', '/create-searchalert', 'SearchAlertsController@createSearchAlert');
    router.route('GET', '/logout', 'UserController@logout');
    router.route('POST', '/addfavorite', 'FavoriteController@addFavorite');
    router.route('POST', '/removefavorite', 'FavoriteController@removeFavorite');
  });



}
