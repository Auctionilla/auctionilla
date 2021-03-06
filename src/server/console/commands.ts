import { CommandMapping } from 'chen/console';

export const COMMANDS: CommandMapping = {

  'get-number-and-emails': {
    class: 'getNumberAndEmails',
    arguments: []
  },
  'get-crawled': {
  	class: 'getCrawledData',
  	arguments:['auctionsite']
  },
  'get-barnebys-data': {
  	class: 'getBarnebysCrawledData',
  	arguments: []
  },
  'update-category': {
  	class: 'updateCategoryDescription',
  	arguments: []
  }


};
