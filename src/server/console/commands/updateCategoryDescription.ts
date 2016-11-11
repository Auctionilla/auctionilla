import { ArtisanCommand } from 'chen/console';
import { injectable } from 'chen/core';
import { CategoryService } from 'app/services'


@injectable
export class updateCategoryDescription extends ArtisanCommand {
  constructor(private categoryService: CategoryService) {//, private httpClientOptions: HttpClientOptions
    super();
  }
  async updateCategories () {
    let categories = {
      category1: {
        category_name: 'Fashion and Vintage',
        description: 'Here you will find auctions featuring clothes, bags, shoes, accessories and headwear, from vintage bargains to high-fashion luxury items'
      },
      category2: {
        category_name: 'Watches and Clocks',
        description: `From wristwatches, to grandfather clocks and pocket watches, it's all here`
      },
      category3: {
        category_name: 'Jewelry and Gems',
        description: 'From diamonds, to costume and vintage jewelry, search it all here.'
      },
      category4: {
        category_name: 'Miscellaneous',
        description: 'Auctions with exciting and somewhat more unusual items. Such objects may include large household items such as bathtubs and old stoves, as well as taxidermy pieces, religious objects such as icons, and mixed lots containing miscellaneous objects.'
      },
      category5: {
        category_name: 'Porcelain and Pottery',
        description: 'Items made of porcelain, earthenware, stoneware and faience from every country.'
      },
      category6: {
        category_name: 'Nautica, Technica and Optic',
        description:'Cameras, photographic equipment, barometers, octants and sextants, ship chronometers, and various devices are listed under the category Nautical, Technical & Optics.'
      },
      category7: {
        category_name: 'Contemporary Art',
        description: 'Art works from artists active during the 1960s to today, including Post-modern and other reactions to modernism.'
      },
      category8: {
        category_name: 'Glass',
        description: 'Under this category you will find all items made of glass.'
      },
      category9: {
        category_name: 'Furniture, Design and Mirrors',
        description: 'From antique chests, chairs, desks, and decorative objects, to modern design.'
      },
      category10: {
        category_name: 'Books, Maps and Manuscripts',
        description: 'Featuring books, catalogs, newspapers, letters, manuscripts and cartography.'
      },
      category11: {
        category_name: 'Tin and Metals',
        description: 'Including cutlery, pots, plates and bowls in pewter, copper and brass, nickel silver and other metals.'
      },
      category12: {
        category_name: 'Coins and Banknotes',
        description: 'Collectible coins and banknotes, including historical coins and rare types of currency.'
      },
      category13: {
        category_name: 'Toys and Collectibles',
        description: 'A wide variety of dolls, doll’s houses, toy cars, toy soldiers, robots and trains, representing the finest and most collectable makers. Vintage collectables such as film memorabilia can also be found in this section.'
      },
      category14: {
        category_name: 'Oriental ceramics and Works of art',
        description: 'All china, pottery and other crafts from the cultures of Asia and the Far East can be found at auction here.'
      },
      category15: {
        category_name: 'Medals, Arms and Armor',
        description: 'Historical and modern weapons such as rifles, knives, and pistols as well as antique armor, swords, ceremonial weaponry, and flintlock rifles.'
      },
      category16: {
        category_name: 'Wine and Spirits',
        description: 'All alcoholic beverages that are up for auction.'
      },
      category17: {
        category_name: 'Postcards and Stamps',
        description: 'Postcards, stamps, handwritten letters and stamp albums.'
      }
      
     

    }
    for (var item in categories) {
     console.log(categories[item])
     let checkifexist = await this.categoryService.getOneBy('category_name',(categories[item].category_name))
     if (checkifexist) {
       console.log('existing id:', checkifexist.get('id'))
       let updatecateg = await this.categoryService.update(parseInt(checkifexist.get('id')), {description: categories[item].description})
       if (updatecateg) {
         console.log('category:',categories[item].description, 'id:', checkifexist.get('id'))
       }
     }
    }


    //remove unused category from categories
    let checkifexist = await this.categoryService.getOneBy('category_name','Jewels and Gems')
    if (checkifexist) {
      let removethis = await this.categoryService.destroy(parseInt(checkifexist.get('id')))
      if (removethis) {
        console.log('removed item')
      }
    }
    let checkifexist2 = await this.categoryService.getOneBy('category_name','Furnitures')
    if (checkifexist2) {
      let removethis = await this.categoryService.destroy(parseInt(checkifexist2.get('id')))
      if (removethis) {
        console.log('removed item')
      }
    }
    let checkifexist3 = await this.categoryService.getOneBy('category_name','others')
    if (checkifexist3) {
      let removethis = await this.categoryService.destroy(parseInt(checkifexist3.get('id')))
      if (removethis) {
        console.log('removed item')
      }
    }

    return categories
  }
  public async execute() {
    await this.updateCategories()
  }
}
