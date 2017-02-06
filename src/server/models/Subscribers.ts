import { SQLModel } from 'chen/sql';

export class Subscribers extends SQLModel {

  protected table: string = 'subscribers';
  protected fillable:string[] = ['email'];

  



}
