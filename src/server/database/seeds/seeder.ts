
import { AuctionSite, Category, AuctionItem } from 'app/models';


export async function seed() {

  // let auctionSiteService = new AuctionSiteService();

  let auctionSites = {
    site1: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site2: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site3: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site4: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site5: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site6: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    },
    site7: {
      site_name: 'site name1',
      site_url: 'site url 1',
      site_emblem: 'site emblem url'
    }
  }

  for (var item in auctionSites) {
     console.log(auctionSites[item])
     let addtosite = await AuctionSite.connection().create(auctionSites[item])
     console.log(addtosite)
  }

  //====================end seeding auctin site==============================


  let categories = {
    category1: {
      category_name: 'category name1',
      description: 'category description'
    },
    category2: {
      category_name: 'category name2',
      description: 'category description'
    },
    category3: {
      category_name: 'category name3',
      description: 'category description'
    },
    category4: {
      category_name: 'category name4',
      description: 'category description'
    },
    category5: {
      category_name: 'category name5',
      description: 'category description'
    },
    category6: {
      category_name: 'category name6',
      description: 'category description'
    },
    category7: {
      category_name: 'category name7',
      description: 'category description'
    }

  }

  for (var item in categories) {
     console.log(categories[item])
     let addtosite = await Category.connection().create(categories[item])
     console.log(addtosite)
  }

  //===============================end seeding categories =================

  let auctionItems = {
    item1: {
      item_title: 'item title 1',
      item_description: 'description 1',
      auction_url: 'the auction url',
      item_image: 'image url',
      price_status: 'the price status',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '10/23/32',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 2
    },
    item2: {
      item_title: 'item title 1',
      item_description: 'description 1',
      auction_url: 'the auction url',
      item_image: 'image url',
      price_status: 'the price status',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '10/23/32',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 2
    },
    item3: {
      item_title: 'item title 1',
      item_description: 'description 1',
      auction_url: 'the auction url',
      item_image: 'image url',
      price_status: 'the price status',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '10/23/32',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 2
    },
    item4: {
      item_title: 'item title 1',
      item_description: 'description 1',
      auction_url: 'the auction url',
      item_image: 'image url',
      price_status: 'the price status',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '10/23/32',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 2
    },
    item5: {
      item_title: 'item title 1',
      item_description: 'description 1',
      auction_url: 'the auction url',
      item_image: 'image url',
      price_status: 'the price status',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '10/23/32',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 2
    }

  }

  for (var item in auctionItems) {
     console.log(auctionItems[item])
     let addtosite = await AuctionItem.connection().create(auctionItems[item])
     console.log(addtosite)
  }

  console.log('seeder done')

}
