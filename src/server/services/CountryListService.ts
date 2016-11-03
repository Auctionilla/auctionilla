import { injectable, Service } from 'chen/core';

const countryList = require('country-list');

@injectable
export class CountryListService extends Service {
private countrylist = new countryList;

  getAllCountry() {
    return this.countrylist.getNames();
  }

  getCountryCode(country) {
    return this.countrylist.getCode(country);
  }
}
