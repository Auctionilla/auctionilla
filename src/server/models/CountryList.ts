import { SQLModel } from 'chen/sql';

export class CountryList extends SQLModel {

  protected table: string = 'country_list';
  protected fillable:string[] = ['country_name', 'country_code'];


 


}
