import { Router } from 'chen/web';
import { Config } from 'chen/core';

export default function (router: Router, config: Config) {

  //router.route('GET', '/', 'IndexController@index');
  router.route('GET', '/', 'AuctionItemController@searchItem');
  //router.route('POST', '/', 'AuctionListController@searchAuction');
  router.route('POST', '/register', 'UserController@register');
  router.route('GET', '/verify-account/:verification_code/:id', 'UserController@verifyAccount');
  router.route('POST', '/login', 'UserController@login');
  // router.route('GET', '/auction/page-offset/:offset/:page', 'AuctionItemController@listItems');
  // router.route('GET', '/auction/page-offset/:offset/:page/:searchItem', 'AuctionItemController@listItems');
  // router.route('POST', '/auction/search', 'AuctionItemController@listItems');
  router.route('GET', '/search', 'AuctionItemController@searchItem');


  // router.group({middleware: ['UserAuth']}, route => {
  //   router.route('GET', '/logout', 'UserController@logout');
  //   router.route('GET', '/savefavorite/:itemid', 'UserController@saveFavorite');
  //   router.route('GET', '/save-search-alert', 'UserController@saveSearchAlert');
  // });
}
