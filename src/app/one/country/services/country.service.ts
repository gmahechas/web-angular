import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private countryPagination: fromGraphql.CountryPaginationGQL,
    private countryStoreGQL: fromGraphql.CountryStoreGQL,
    private countryUpdateGQL: fromGraphql.CountryUpdateGQL,
    private countryDestroyGQL: fromGraphql.CountryDestroyGQL
  ) { }

  load(searchCountry: fromModels.SearchCountry) {
    return this.countryPagination.watch({
      ...searchCountry.country,
      limit: searchCountry.limit,
      page: searchCountry.page
    }).valueChanges;
  }

  store(country: fromModels.Country) {
    return this.countryStoreGQL.mutate(country);
  }

  update(country: fromModels.Country) {
    return this.countryUpdateGQL.mutate(country);
  }

  destroy(country: fromModels.Country) {
    return this.countryDestroyGQL.mutate(country);
  }

  pagination(searchCountry: fromModels.SearchCountry) {
    return this.countryPagination.fetch({
      ...searchCountry.country,
      limit: searchCountry.limit,
      page: searchCountry.page
    });
  }

}
