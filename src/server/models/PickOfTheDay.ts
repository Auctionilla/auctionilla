import { SQLModel } from 'chen/sql';

export class PickOfTheDay extends SQLModel {

  protected table: string = 'pick_of_the_day';
  protected fillable:string[] = ['item_id_fk'];



}
