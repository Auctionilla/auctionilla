import { SQLModel } from 'chen/sql';

export class PopularSearch extends SQLModel {

  protected table: string = 'popular_search';
  protected fillable:string[] = ['search_key'];



}
