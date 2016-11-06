import { injectable, ValidationRules } from 'chen/core';
import { SQLService } from 'chen/sql';
import { CountryList } from 'app/models';


@injectable
export class CountryListService extends SQLService<CountryList> {

  protected modelClass = CountryList;

  protected validationRules: ValidationRules = {};

  constructor() {
    super();
  }

  addCountry(country_name, country_code) {
  	return this.create({
  		country_name: country_name,
  		country_code: country_code
  	})
  }

  getCountryCode(name) {
  	return this.query(query => {
  		query.where('country_name', name)
  	}).get();
  }

}
