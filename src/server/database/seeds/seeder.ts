
import { AuctionSite, Category, AuctionItem, PickOfTheDay } from 'app/models';


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
     //console.log(auctionSites[item])
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



  //seed pick of the day


  //===============================end seeding categories =================




  let auctionItems = {

    item1: {
      item_title: 'Judith Seligson, Titrate, 2012',
      item_description: 'Judith Seligson, Titrate, 2012, Painting, 6.00 x 6.00 in., 15.2 x 15.2 cm, Unique Work',
      auction_url: 'http://www.artspace.com/judith-seligson/titrate?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=artspace&utm_campaign=barnebys',
      item_image: 'http://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/judith-seligson/25979-666093553587/judith-seligson-titrate-800x800.jpg',
      price_status: 'Fix price',
      price: 0,
      currency: '',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 10,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 1,
      auction_site_fk: 1
    },
    item2: {
      item_title: 'Nathalie Ng, Kaka, 2016',
      item_description: 'Mathalie Ng, Kaka, 2016. Painting, 60.0 x 20.0cm',
      auction_url: 'http://www.artspace.com/nathalie-ng/kaka?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=artspace&utm_campaign=barnebys',
      item_image: 'http://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/nathalie-ng/24639-641059735872/nathalie-ng-kaka-800x800.jpg',
      price_status: 'Fix price',
      price: 10000,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 9,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 1,
      auction_site_fk: 1
    },
    item3: {
      item_title: 'HAJERA',
      item_description: 'MAQBOOL FIDA HUSAIN',
      auction_url: 'http://www.sothebys.com/en/auctions/ecatalogue/2016/modern-contemporary-south-asian-art-l16500/lot.39.html?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=modern-general-and-contemporary-south-asian-art&utm_campaign=barnebysl',
      item_image: 'http://inspirationseek.com/wp-content/uploads/2014/06/Abstract-Painting-720x340.jpg',
      price_status: 'Fix price',
      price: 61100,
      currency: 'USD',
      location: 'GBR',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 3,
      deader_bid: '',
      favorites_count: 2000,
      category_id_fk: 1,
      auction_site_fk: 1
    },
    item4: {
      item_title: 'JEAN-PASCAL FLAVIEN',
      item_description: 'Soundwork on cd 15in 18cm offset printed record sleeveset of 11 offset printed business cards',
      auction_url: 'http://www.artspace.com/jean-pascal-flavien/statement-house-temporary-title?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=artspace&utm_campaign=barnebys',
      item_image: 'http://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/jean-pascal-flavien/20508-583935764799/66-tiles/000001.jpg',
      price_status: 'Fix price',
      price: 11300,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-05-04 01:40:23',
      converted_date: 2,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 1,
      auction_site_fk: 1
    },
    item5: {
      item_title: 'BREYER P-ORRIDGE',
      item_description: '17.00 x 11.00 in, 43.2 x 27.9 cm, Edition of 15',
      auction_url: 'http://www.artspace.com/breyer-p-orridge/drug-wallpaper?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=artspace&utm_campaign=barnebys',
      item_image: 'http://d5wt70d4gnm1t.cloudfront.net/media/a-s/artworks/breyer-p-orridge/18092-503734623643/breyer-p-orridge-drug-wallpaper-800x800.jpg',
      price_status: 'Fix price',
      price: 30530,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-08-12 01:40:23',
      converted_date: 2,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 1,
      auction_site_fk: 1
    },
    item6: {
      item_title: 'Rolex Daytona, ref. 6265 with Box and Paper',
      item_description: 'This stunning Rolex Daytona 6265 is in fantastic condition and comes complete with box, paper and hangtag.',
      auction_url: 'http://thekeystone.com/collections/watches-new-arrivals/products/rolex-daytona-ref-6265-with-box-and-paper?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=the-keystone&utm_campaign=barnebys',
      item_image: 'http://cdn.shopify.com/s/files/1/0207/2436/products/111509_02_large.jpg?v=1476129929',
      price_status: 'Fix price',
      price: 120000,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-01 08:40:23',
      converted_date: 5,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 2,
      auction_site_fk: 2
    },
    item7: {
      item_title: 'Tag Heuer Carrera Calibre 6 Mens Watch',
      item_description: 'Tag Heuer Carrera Calibre 6 mens watch with box. Signs of usage - Sold as is. Approx. measurement: Case 1.90 inches Wrist 6.50 inches ADJUSTABLE.',
      auction_url: 'https://www.auctionking.com/auction-lot/tag-heuer-carrera-calibre-6-mens-watch-23383?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=liquidation-auction-art-jewelry-designer-bags-general-and-watches&utm_campaign=barnebys',
      item_image: 'https://www.auctionking.com/assets/lot/232_11.jpg',
      price_status: 'Low estimate',
      price: 0,
      currency: '',
      location: 'US',
      auction_date: '2016-10-12 10:44:15',
      converted_date: 5,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 2,
      auction_site_fk: 2
    },
    item8: {
      item_title: 'Mike Keenans St.Louis Blues Quartz Watch',
      item_description: 'Offered here is Mike Keenans personally owned St.Louis Blues Quartz Watch. ',
      auction_url: 'http://auction.steinersports.com/Mike_Keenan_s_St_Louis_Blues_Quartz_Watch-LOT64032.aspx?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=the-fall-classic&utm_campaign=barnebys',
      item_image: 'http://auction.steinersports.com/ItemImages/000064/64032a_med.jpeg',
      price_status: 'Low estimate',
      price: 200,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 5,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 2,
      auction_site_fk: 2
    },
    item9: {
      item_title: 'Rolex Vintage Oyster Watch',
      item_description: 'Ladies stainless steel 28mm Rolex Vintage Oyster manual wind watch with engraved bezel...',
      auction_url: 'https://www.therealreal.com/products/women/fine-watches/leather-strap/rolex-2103832?sid=vg5cq9&utm_source=auctions&utm_medium=www.barnebys.com&cvosrc=cse.barnebys.barnebys&cvo_crid=%7Bcreative%7D&utm_content=therealreal&utm_campaign=barnebys',
      item_image: 'https://product-images4.therealreal.com/RLX21922_1_product.jpg',
      price_status: 'Fix price',
      price: 1995,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 5,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 2,
      auction_site_fk: 2
    },
    item10: {
      item_title: 'Unused Breitling Bentley GMT EB043210/BD23-222S',
      item_description: 'Gents Breitling Bentley GMT in titanium on a rubber strap. ',
      auction_url: 'http://www.grayandsons.com/fine-watches/w519331-unused-breitling-bentley-gmt-eb043210.html?utm_source=auctions&utm_medium=www.barnebys.com&utm_content=gray-and-sons&utm_campaign=barnebys',
      item_image: 'http://www.grayandsons.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/w/5/w519331_z.jpg',
      price_status: 'Fix price',
      price: 9810,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-05-12 01:40:23',
      converted_date: 5,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 2,
      auction_site_fk: 2
    },
    item11: {
      item_title: 'IPPOLITA PHANTOM CUTOUT RING',
      item_description: '18K yellow gold Ippolita Phantom Cutout Ring featuring mother of pearl and quartz doublet.',
      auction_url: 'https://www.therealreal.com/products/women/jewelry/rings/ippolita-phantom-cutout-ring-2?sid=vg5cq9&utm_source=auctions&utm_medium=www.barnebys.com&cvosrc=cse.barnebys.barnebys&cvo_crid=%7Bcreative%7D&utm_content=therealreal&utm_campaign=barnebys',
      item_image: 'https://product-images4.therealreal.com/IPP22988_1_product.jpg',
      price_status: 'Fix price',
      price: 1175,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-09-12 02:40:53',
      converted_date: 6,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 3
    },
    item12: {
      item_title: 'Diamonds Touch The Heart, GIA Graded Diamonds, True Love by Bid Global Intl ',
      item_description: 'Diamonds Touch The Heart, GIA Graded Diamonds, True Love by Bid Global Intl ',
      auction_url: 'https://connect.invaluable.com/bidglobal/auction-catalog/Day-2-:-Diamonds-Touch-The-Heart,-GIA-Graded-Diamonds,-True-Love-by-Bid-Global-Int-l_2LT7CY26F0/',
      item_image: 'https://image.invaluable.com/housePhotos/BidGlobal/00/596200/H19442-C104766434.jpg',
      price_status: 'Low estimate',
      price: 15500,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 29,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 3
    },
    item13: {
      item_title: 'Celtic vintage Scottish brooches',
      item_description: 'Celtic vintage Scottish brooches',
      auction_url: 'https://auction.catawiki.com/kavels/8167125-celtic-vintage-scottish-brooches?utm_source=Barnebys&utm_medium=coop&utm_content=datafeed&utm_campaign=Jewellery(Antique)-IT',
      item_image: 'https://assets.catawiki.nl/assets/2016/10/11/b/8/2/b82288a4-8f8a-11e6-9520-5293563caa64.jpg',
      price_status: 'Low estimate',
      price: 80,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 7,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 3
    },
    item14: {
      item_title: 'Chrome Hearts Tounge and Lips Pendant Necklace',
      item_description: 'Mens black leather and suede braided cord Chrome Hearts necklace',
      auction_url: 'https://www.therealreal.com/products/men/mens-jewelry/necklaces/chrome-hearts-tongue-and-lips-pendant-necklace?sid=vg5cq9&utm_source=auctions&utm_medium=www.barnebys.com&cvosrc=cse.barnebys.barnebys&cvo_crid=%7Bcreative%7D&utm_content=therealreal&utm_campaign=barnebys',
      item_image: 'https://product-images4.therealreal.com/CHH21276_1_product.jpg',
      price_status: 'Fix price',
      price: 895,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 7,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 3
    },
    item15: {
      item_title: 'SCALLOPED DIAMOND HUGGIE EARRINGS',
      item_description: '20% Off! Use Promo Code: FALLFAVES',
      auction_url: 'https://www.therealreal.com/products/women/jewelry/earrings/scalloped-diamond-huggie-earrings?sid=vg5cq9&utm_source=auctions&utm_medium=www.barnebys.com&cvosrc=cse.barnebys.barnebys&cvo_crid=%7Bcreative%7D&utm_content=therealreal&utm_campaign=barnebys',
      item_image: 'https://product-images4.therealreal.com/FJE29170_1_product.jpg',
      price_status: 'Fix price',
      price: 825,
      currency: 'USD',
      location: 'US',
      auction_date: '2016-10-12 01:40:23',
      converted_date: 7,
      deader_bid: '',
      favorites_count: 0,
      category_id_fk: 3,
      auction_site_fk: 3
    },
    item16: {
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
    item17: {
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
    item18: {
      item_title: 'Yogi Berra Signed Black & White Wire Photo - Berra with Avila 7/24/51',
      item_description: 'Yogi Berra is a name that will forever be synonymous with baseball (194663, 1965).',
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
    item19: {
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
    item520: {
      item_title: 'Manuel Alvarez Bravo (1902-2002) - Couple, ca.1940',
      item_description: 'Gelatin silver print, printed later, signed and annotated in pencil verso ..',
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
    item21: {
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
    item22: {
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
    item23: {
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
    item24: {
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
    item25: {
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
    item26: {
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
    item27: { ///////// thi is the start of realized items
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
    item28: {
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

  let pick = {
    item_id_fk: 1
  }
  let picoftheday = await PickOfTheDay.connection().create(pick)
  console.log('pic seeded', picoftheday);
  console.log('seeder done')

}
