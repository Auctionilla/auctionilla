import { SQLModel } from 'chen/sql';
import { AuctionItem } from 'app/models';

export class AuctionSite extends SQLModel {

  protected table: string = 'auction_site';
  protected fillable:string[] = ['site_name', 'site_url', 'site_logo'];


  auctionItems() {
    return this.hasMany(AuctionItem, 'auction_site_fk')
  }


}
