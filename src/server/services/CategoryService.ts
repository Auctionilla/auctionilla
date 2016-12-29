import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { Category } from 'app/models';


@injectable
export class CategoryService extends SQLService<Category> {

  protected modelClass = Category;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  createCategory(data){
    return this.create({
      category_name: data.category_name,
      description: data.desc
    });
  }


  getAllCategories() {
    return this.query(query => {
      query.select('*');
      query.offset(0);
      query.limit(10);
    }).get();
  }

  searchCategory(searchKey, offset, limit) {
    return this.query(query => {
      query.where('category_name', 'like', `%${searchKey}%`);
      query.offset(offset);
      query.limit(limit);
    }).get();
  }

  // getPopularItemsByCategories(){
  //   return this.query(query => {
  //     query.select('categories.*')
  //     query.select('a.auction_items')
  //     query.join('auction_items as a', function (){
  //       this.on ('a.category_id_fk', '=', 'categories.id')
  //     });
  //   }).get();
  // }
}
