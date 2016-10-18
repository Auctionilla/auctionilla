
import { AuctionSite, Category, AuctionItem } from 'app/models';


export async function seed() {

  // let auctionSiteService = new AuctionSiteService();

  let auctionSites = {
    site1: {
      site_name: 'A-1 Auction',
      site_url: 'http://www.fellows.co.uk/1800-lot-48-A-superb-pair-of-Wedgwood-three-colour-jasperware-figural-candelabra?view=lot_detail&utm_source=auctions&utm_medium=www.barnebys.com&utm_content=antiques-general-and-fine-art&utm_campaign=barnebys',
      site_emblem: 'http://www.fellows.co.uk/images/logo.svg '
    },
    site2: {
      site_name: '888 Auctions',
      site_url: 'http://austinauction.hibid.com/lot/27717655/sergio-mazza-for-artemide-delta-wall-light/?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=nassour-estate-day-one&utm_campaign=barnebys',
      site_emblem: 'https://auctionimages.s3.amazonaws.com/t/1x1blank.png'
    },
    site3: {
      site_name: 'AAA Public Auction',
      site_url: 'http://www.invaluable.com/auction-lot/marc-chagall.-le-chandelier-the-candlestick-192-c-6b54506aea?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=october-auction-books-prints-paintings-general-and-sculptures&utm_campaign=barnebys',
      site_emblem: 'http://www.invaluable.com/wwwImages/header/IN_Logo_Tag.png'
    },
    site4: {
      site_name: 'Absolute Auction Co.',
      site_url: 'http://www.artspace.com/judith-seligson/titrate?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=artspace&utm_campaign=barnebys',
      site_emblem: 'http://www.artspace.com/static/common/img/header/logo.svg'
    },
    site5: {
      site_name: 'A Bao Art Auctions',
      site_url: 'http://clk.tradedoubler.com/click?p=255259&a=2462193&g=22215790&epi=heritage-auctions&epi2=peter-lanz-hohnstedt-american-1872-1957-summer-landscape-oil-on&url=http%3A%2F%2Fhistorical.HA.com%2Fc%2Fitem.zx%3FsaleNo%3D5273%26lotNo%3D75132%26type%3DBarnebys5273%26utm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dheritage-auctions%26utm_campaign%3Dbarnebys',
      site_emblem: 'http://image.invaluable.com/housePhotos/logos/PosterAI-logo.jpg'
    },
    site6: {
      site_name: 'Abbingdon Auctions',
      site_url: 'site url 1',
      site_emblem: 'http://image.invaluable.com/housePhotos/logos/Whytes-logo.jpg'
    },
    site7: {
      site_name: 'Aaron Joseph and Company',
      site_url: 'https://connect.invaluable.com/whytes/',
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
      category_name: 'Arts And Graphics',
      description: 'category description'
    },
    category2: {
      category_name: 'Watches And Clocks',
      description: `From wristwatches, to grandfather clocks and pocket watches, it's all here`
    },
    category3: {
      category_name: 'Jewelry And Gems',
      description: 'From diamonds, to costume and vintage jewelry, search it all here.'
    },
    category4: {
      category_name: 'Furniture, Design And Mirrors',
      description: 'Click here for furniture including couches, dressers, and chairs, as well as furniture for the garden'
    },
    category5: {
      category_name: 'Photography',
      description: 'Photography books, original photography and more'
    }

  }

  for (var item in categories) {
     console.log(categories[item])
     let addtosite = await Category.connection().create(categories[item])
     console.log(addtosite)
  }

  //===============================end seeding categories =================

  let auctionItems = {
    item1c: {
      item_title: 'MILLER HUGGINS PHOTOGRAPH CHARLES CONLON (1868-1945)',
      item_description: 'MILLER HUGGINS PHOTOGRAPH CHARLES CONLON (1868-1945)',
      auction_url: 'http://clk.tradedoubler.com/click?p=255259&a=2518447&g=22215790&epi=the-golden-age-of-baseball-selections-of-works-from-the-national&epi2=miller-huggins-photograph-charles-conlon-1868-1945&url=http%3A%2F%2Fwww.christies.com%2Flotfinder%2Flot%2Fmiller-huggins-photograph-charles-conlon-6021680-details.aspx%3Ffrom%3Dsalesummery%26intObjectID%3D6021680%26sid%3D226dffb5-1ccd-4536-8f64-e18575a8a37d%26utm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dthe-golden-age-of-baseball-selections-of-works-from-the-national%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.christies.com%2Flotfinderimages%2Fd60216%2Fd6021680x.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 1500,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 4,
      auction_site_fk: 5
    },
    item2c: {
      item_title: 'NAPOLEON SARONY (1821-1896) The Sarony Photographic Art Album. Oversized',
      item_description: 'NAPOLEON SARONY (1821-1896) The Sarony Photographic Art Album. ',
      auction_url: 'http://catalogue.swanngalleries.com/asp/fullCatalogue.asp?salelot=2426++++++50+&refno=++721354&saletype=%20&utm_source=auctions&utm_medium=www.barnebys.com&utm_content=photographs-general-and-photobooks&utm_campaign=barnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fcatalogue.swanngalleries.com%2F%2Ffull%2F%2F354%2F721354.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 100,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 2000,
      category_id_fk: 4,
      auction_site_fk: 5
    },
    item3c: {
      item_title: 'Yogi Berra Signed Black & White Wire Photo - Berra with Avila 7/24/51',
      item_description: 'Yogi Berra is a name that will forever be synonymous with baseball. He dedicated decades of his life to baseball as a catcher, manager, and coach who played 19 seasons in Major League Baseball (MLB) (194663, 1965)',
      auction_url: 'http://auction.steinersports.com/Yogi_Berra_Signed_Black___White_Wire_Photo___Berra-LOT63067.aspx?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=the-fall-classic&utm_campaign=barnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fauction.steinersports.com%2FItemImages%2F000063%2FCATALTD000120_med.jpeg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 80,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 23,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 4,
      auction_site_fk: 5
    },
    item4c: {
      item_title: 'Advertising card for Abraham Bogardus.',
      item_description: 'Advertising card for Abraham Bogardus. 4 7/8 x 3 - inch print on a 5 x 3 inch mount. ',
      auction_url: 'http://www.invaluable.com/auction-lot/advertising-card-for-abraham-bogardus.-73-c-b3a443fa01?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=photographs-cabinet-cards-general-and-some-civil-war&utm_campaign=barnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=https%3A%2F%2Fimage.invaluable.com%2FhousePhotos%2FBe-Hold%2F56%2F596156%2FH1294-L104597878.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 120,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-20 11:40:23',
      converted_date: 23,
      dealer_bid: 'dealer',
      favorites_count: 0,
      category_id_fk: 4,
      auction_site_fk: 5
    },
    item5c: {
      item_title: 'Manuel Alvarez Bravo (1902-2002) - Couple, ca.1940',
      item_description: 'Gelatin silver print, printed later, signed and annotated in pencil verso, 24 x 18.8cm (9 1/2 x 7 3/8in)Provenance: Acquired directly from Colette Alvarez Urbajtel',
      auction_url: 'http://clk.tradedoubler.com/click?p=255260&a=2453825&g=22215724&epi=fine-photographs&epi2=manuel-alvarez-bravo-1902-2002-couple-ca1940&url=http%3A%2F%2Fwww.dreweatts.com%2Fcms%2Fpages%2Flot%2F36233%2F84%3Futm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dfine-photographs%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.dreweatts.com%2Fmedia%2Fdreweatts%2Finventory%2F4%2F7%2F3%2F473045-14.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Fix price',
      price: 1800,
      currency: 'USD',
      location: 'GB',
      auction_date: '2016-10-20 09:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 4,
      auction_site_fk: 5
    },
    item6c: {
      item_title: 'Tre poltroncine moderne con ruote in scamosciato',
      item_description: 'cm 68x58x70',
      auction_url: 'http://clk.tradedoubler.com/click?p=273132&a=2852535&g=23386146&epi=asta-a-tempo-antiquariato&epi2=tre-poltroncine-moderne-con-ruote-in-scamosciato&url=http%3A%2F%2Fwww.cambiaste.com%2Fuk%2Fauction-0268-2%2Ftre-poltroncine-moderne-con-ruote-in-scamoscia.asp%3Futm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dasta-a-tempo-antiquariato%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Ffoto.cambiaste.com%2FFoto%2FOriginali%2F1%2F153309%2F153309.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 1800,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 01:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 6
    },
    item7c: {
      item_title: 'Louis Faurer (1916-2001) - Social Patron, New York, NY, 1948',
      item_description: 'Gelatin silver print on Agfa paper, printed 1981, signed, titled, dated and annotated in pencil verso, 18 x 26.9cm (7 1/8 x 10 5/8in)Provenance: Howard Greenberg Gallery, New York',
      auction_url: 'http://clk.tradedoubler.com/click?p=255260&a=2453825&g=22215724&epi=fine-photographs&epi2=louis-faurer-1916-2001-social-patron-new-york-ny-1948&url=http%3A%2F%2Fwww.dreweatts.com%2Fcms%2Fpages%2Flot%2F36233%2F93%3Futm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dfine-photographs%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.dreweatts.com%2Fmedia%2Fdreweatts%2Finventory%2F4%2F7%2F3%2F473045-30.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Fix price',
      price: 60000,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 5
    },
    item8c: {
      item_title: 'UNO SPECCHIO DA PARETE',
      item_description: 'UNO SPECCHIO DA PARETE, anni 40. Cristallo colorato inciso e argntato, cristallo argentato. Cm 87 x 60.',
      auction_url: 'http://clk.tradedoubler.com/click?p=273132&a=2851712&g=23386146&epi=mercoledi-26-ottobre-2016&epi2=uno-specchio-da-parete&url=http%3A%2F%2Fwww.asteboetto.it%2Findex.php%2Fit%2Fcomponent%2Fcontent%2Farticle%3Fid%3D135%26codAsta%3D1609%26Lotto%3D1214%26ProgrLotto%3D0%26utm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dmercoledi-26-ottobre-2016%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.asteboetto.it%2Fimages%2Faste%2F1609%2Fhd%2F1214.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Low estimate',
      price: 330,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 6
    },
    item9c: {
      item_title: 'Petite commode française marqueteée avec dessus en marbre',
      item_description: `Petite commode franaise du XXme sicle. Meuble joliment incrusts en bois d'acajou, palissandre, bois de rose, rable, buis et bois de fruits et dcor avec bronzes dors et cisels. `,
      auction_url: 'http://clk.tradedoubler.com/click?p=273132&a=2851692&g=23386146&epi=parino-mercato-antiquario&epi2=petite-commode-francaise-marqueteee-avec-dessus-en-marbre&url=https%3A%2F%2Fwww.parino.it%2FSmall-French-inlaid-dresser-with-marble-top%2Fprod_1725.html%3Futm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dparino-mercato-antiquario%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=https%3A%2F%2Fwww.parino.it%2Fimg%2Fimg_8588_1.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Realized',
      price: 1200,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 6
    },
    item10c: {
      item_title: 'A FRENCH ORMOLU AND SEVRES-STYLE PORCELAIN-MOUNTED TULIPWOOD... LATE',
      item_description: 'A FRENCH ORMOLU AND SEVRES-STYLE PORCELAIN-MOUNTED TULIPWOOD... LATE',
      auction_url: 'http://clk.tradedoubler.com/click?p=255259&a=2518447&g=22215790&epi=noble-general-and-private-collections-part-ii&epi2=a-french-ormolu-and-sevres-style-porcelain-mounted-tulipwood-late&url=http%3A%2F%2Fwww.christies.com%2Flotfinder%2Ffurniture-lighting%2Fa-french-ormolu-and-sevres-style-porcelain-mounted-tulipwood-6032593-details.aspx%3Ffrom%3Dsalesummery%26intObjectID%3D6032593%26sid%3Deac43653-af53-43f3-977c-4547192a8701%26utm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dnoble-general-and-private-collections-part-ii%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.christies.com%2Flotfinderimages%2Fd60325%2Fd6032593x.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Realized',
      price: 2000,
      currency: 'GPB',
      location: 'GB',
      auction_date: '2016-10-20 14:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 6
    },
    item11c: {
      item_title: 'Late 20th century Italian fruits carved painted round mirror',
      item_description: 'Modern round Tuscan mirror, polycrome painted and carved with fruits. Period: 1900 Article size: height: d. 106 cm',
      auction_url: 'http://clk.tradedoubler.com/click?p=273132&a=2881533&g=23386146&epi=ghilli-antichita&epi2=late-20th-century-italian-fruits-carved-painted-round-mirror&url=http%3A%2F%2Fwww.ghilli.it%2Fen%2Fpr%2Flate-20th-century-italian-fruits-carved-painted-round-mirror%2F%3Futm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26utm_content%3Dghilli-antichita%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=http%3A%2F%2Fwww.ghilli.it%2Fwp-content%2Fuploads%2F2015%2F12%2Fspecchiera-tonda-legno-intagliato-policromo-moderna-876.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Realized',
      price: 1100,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 04:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 5,
      auction_site_fk: 6
    },
    item20c: { ///////// thi is the start of realized items
      item_title: 'NV Billecart-Salmon - Brut Reserve 750ml',
      item_description: 'NV Billecart-Salmon - Brut Reserve 750ml',
      auction_url: 'http://clk.tradedoubler.com/click?p=255259&a=2887792&g=22215790&epi=vinfolio&epi2=nv-billecart-salmon-brut-reserve-750ml&url=https%3A%2F%2Fwww.vinfolio.com%2Fdo%2Fwinestore%2Fdetail%2FNV-Billecart-Salmon-Brut-Reserve-Champagne%3FwineId%3D104193%26year%3D-1%26size%3D750%26utm_source%3Dbarnebys%26utm_medium%3Dppc',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=https%3A%2F%2Fwww.vinfolio.com%2Fimage%2Flabel%2F104193%2F-1-front.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Hammer price',
      price: 5000,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 04:40:23',
      converted_date: 29,
      dealer_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 6
    },
    item21c: {
      item_title: 'Hermès Toile Jige 29',
      item_description: 'Beige Toile Herms Jige 29 clutch, dark slate leather trim, toile canvas lining and fold-in closure at front flap. Blind stamped Circle G from 1977. ',
      auction_url: 'http://clk.tradedoubler.com/click?p=255259&a=2871213&g=22215790&epi=therealreal&epi2=hermes-toile-jige-29&url=https%3A%2F%2Fwww.therealreal.com%2Fproducts%2Fwomen%2Fhandbags%2Fclutches%2Fhermes-toile-jige-29%3Fsid%3Dvg5cq9%26utm_source%3Dauctions%26utm_medium%3Dwww.barnebys.com%26cvosrc%3Dcse.barnebys.barnebys%26cvo_crid%3D%257Bcreative%257D%26utm_content%3Dtherealreal%26utm_campaign%3Dbarnebys',
      item_image: 'https://d16tpmyokmwdws.cloudfront.net/lot.php?src=https%3A%2F%2Fproduct-images4.therealreal.com%2FHER67468_1_product.jpg&w=250&h=250&crop=true&bg=FFFFFF',
      price_status: 'Realized',
      price: 5000,
      currency: 'USD',
      location: 'IT',
      auction_date: '2016-10-20 04:40:23',
      converted_date: 29,
      dealer_bid: 'dealer',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 6
    }


  }

  for (var item in auctionItems) {
     console.log(auctionItems[item])
     let addtosite = await AuctionItem.connection().create(auctionItems[item])
     console.log(addtosite)
  }

  console.log('seeder done')

}
