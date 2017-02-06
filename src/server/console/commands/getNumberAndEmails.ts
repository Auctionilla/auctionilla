import { ArtisanCommand } from 'chen/console';
import { injectable, File } from 'chen/core';
import { HttpClient} from 'chen/web'; //, HttpClientOptions
const json2csv = require('json2csv');


@injectable
export class getNumberAndEmails extends ArtisanCommand {
  constructor(private httpCLIENT: HttpClient) {//, private httpClientOptions: HttpClientOptions
    super();
  }
  async getWebsiteUrl () {
    let test = await this.httpCLIENT.get('http://www.artnet.com/api/ahdirectory/SearchAuctionHouses?CountryId=145&MembersOnly=false&Sort=1')
    let thejsondate = JSON.parse(test.body)
    let newObject = {}
    for(var attributename in thejsondate.Directory.Groups){
        for (var attr2 in thejsondate.Directory.Groups[attributename].Items) {
         
          let name = thejsondate.Directory.Groups[attributename].Items[attr2].Name;
          let contact = thejsondate.Directory.Groups[attributename].Items[attr2].Locations;
          newObject[name] = contact
          
        }
        
    }
   
    let finres = []
    for (let i in newObject) {
      for (let b in newObject[i]) {
        let additem = newObject[i][b]
        additem['Name'] = i
        let newdata = {
          Name: additem.Name,
          PhoneNumber1: additem.PhoneNumber1,
          PhoneNumber2: additem.PhoneNumber2,
          Fax: additem.Fax,
          Email: additem.GalleryEmail,
          Proprietary_url: additem.ProprietaryUrl,
          Gallery_Address1: additem.GalleryAddress1,
          Gallery_Address2: additem.GalleryAddress2,
          City: additem.City,
          State: additem.State,
          Country: additem.Country,


        }
        console.log(additem)
        finres.push(newdata)

      }
    }

    console.log('writing to csv file')
   
    console.log(finres)
    var csv = json2csv({ data: finres }); 
    await File.create('phonenumberAndEmails.csv', csv);
    
    return test
  }
  public async execute() {
    await this.getWebsiteUrl()
  }
}
