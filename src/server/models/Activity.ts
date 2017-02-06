import { SQLModel } from 'chen/sql';

export class Activity extends SQLModel {

  protected table: string = 'activities';
  protected fillable:string[] = ['item_id_fk', 'activity'];



}
