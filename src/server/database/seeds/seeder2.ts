
import { AuctionSite, Category, PickOfTheDay } from 'app/models';


export async function seed() {

  // let auctionSiteService = new AuctionSiteService();

  let auctionSites = {
    site1: {
      site_name: 'sothebys',
      site_url: 'www.sothebys.com',
      site_emblem: 'https://d16tpmyokmwdws.cloudfront.net/logo.php?src=https%3A%2F%2Fd16tpmyokmwdws.cloudfront.net%2Fah%2F139%2Flogo_small.jpg&bg=FFFFFF'
    },
    site2: {
      site_name: 'heritage auction',
      site_url: 'www.ha.com',
      site_emblem: 'https://d16tpmyokmwdws.cloudfront.net/logo.php?src=https%3A%2F%2Fd16tpmyokmwdws.cloudfront.net%2Fah%2F83%2Flogo_small.jpg&bg=FFFFFF'
    },
    site3: {
      site_name: 'Christies',
      site_url: 'www.christies.com',
      site_emblem: 'https://d16tpmyokmwdws.cloudfront.net/logo.php?src=https%3A%2F%2Fd16tpmyokmwdws.cloudfront.net%2Fah%2F39%2Flogo_small.jpg&bg=FFFFFF'
    },
    
  }
  
  for (var item in auctionSites) {
     //console.log(auctionSites[item])
     let addtosite = await AuctionSite.connection().create(auctionSites[item])
     console.log(addtosite)
  }

  //====================end seeding auctin site==============================


  let categories = {
    category1: {
      category_name: 'Arts And Graphics',
      description: 'Modern, Post-War, Contemporary art, Old Masters and more'
    },
    category2: {
      category_name: 'Watches and Clocks',
      description: `From wristwatches, to grandfather clocks and pocket watches, it's all here`
    },
    category3: {
      category_name: 'Jewels and Gems',
      description: 'From diamonds, to costume and vintage jewelry, search it all here.'
    },
    category4: {
      category_name: 'Furnitures',
      description: 'Click here for furniture including couches, dressers, and chairs, as well as furniture for the garden'
    },
    category5: {
      category_name: 'Photography',
      description: 'Photography books, original photography and more'
    },
    category6: {
      category_name: 'Sculptures',
      description:'The Sculpture category includes large and freestanding sculptures for sale at auctions. The materials vary widely and may include marble, bronze, plaster, plastic and various metals. Small sculptures and, in some cases, busts can be found under the category Works of Art.'
    },
    category7: {
      category_name: 'Silver and Gold',
      description: 'In this category are gold and silver items (not including jewellery), as well as objects in gilt or silver plate, such as flatware and tableware, candlesticks, boxes and small sculptures.'
    },
    
    category8: {
      category_name: 'others',
      description: `items that doesn't belong to any category`
    }

  }

  for (var item in categories) {
     console.log(categories[item])
     let addtosite = await Category.connection().create(categories[item])
     console.log(addtosite)
  }



  //seed pick of the day


  //===============================end seeding categories =================




  

  let pick = {
    item_id_fk: 1
  }
  let picoftheday = await PickOfTheDay.connection().create(pick)
  console.log('pic seeded', picoftheday);
  console.log('seeder done')

}
