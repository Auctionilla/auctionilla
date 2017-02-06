import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { PopularSearch } from 'app/models';


@injectable
export class PopularSearchService extends SQLService<PopularSearch> {

  protected modelClass = PopularSearch;
  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  addSearch(searchkey) {
    return this.create({
      search_key: searchkey
    });
  }

  showSearches(limit) {
    return this.query(query => {
      query.select('search_key as search')
      query.count('id as users')
      query.groupByRaw('search_key')
      query.orderBy('users', 'desc')
      query.limit(limit)
    }).get();
  }



}
