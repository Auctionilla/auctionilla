import { Router } from 'chen/web';
import { Config } from 'chen/core';

export default function (router: Router, config: Config) {

  router.route('GET', '/', 'IndexController@index');
  router.route('GET', '/', 'AuctionListController@getAuctionListByCategory');
  router.route('POST', '/', 'AuctionListController@searchAuction')
}
