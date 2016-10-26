import { Router } from 'chen/web';
import { Config } from 'chen/core';

export default function (router: Router, config: Config) {

  //router.route('GET', '/', 'IndexController@index');
  router.route('GET', '/', 'AuctionItemController@index');
  //router.route('POST', '/', 'AuctionListController@searchAuction');
  router.route('POST', '/register', 'UserController@register');
  router.route('GET', '/verify-account/:verification_code/:id', 'UserController@verifyAccount');
  router.route('POST', '/login', 'UserController@login');


  // router.group({middleware: ['UserAuth']}, route => {
  //   router.route('GET', '/logout', 'UserController@logout');
  //   router.route('GET', '/savefavorite/:itemid', 'UserController@saveFavorite');
  //   router.route('GET', '/save-search-alert', 'UserController@saveSearchAlert');
  // });
}
