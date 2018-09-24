import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private cityPagination: fromGraphql.CityPaginationGQL,
    private cityStoreGQL: fromGraphql.CityStoreGQL,
    private cityUpdateGQL: fromGraphql.CityUpdateGQL,
    private cityDestroyGQL: fromGraphql.CityDestroyGQL
  ) { }

  load(searchCity: fromModels.SearchCity) {
    return this.cityPagination.watch({
      ...searchCity.city,
      estate_id: (searchCity.estate) ? searchCity.estate.estate_id : null,
      limit: searchCity.limit,
      page: searchCity.page
    }).valueChanges;
  }

  store(city: fromModels.City) {
    return this.cityStoreGQL.mutate(city);
  }

  update(city: fromModels.City) {
    return this.cityUpdateGQL.mutate(city);
  }

  destroy(city: fromModels.City) {
    return this.cityDestroyGQL.mutate(city);
  }

  pagination(searchCity: fromModels.SearchCity) {
    return this.cityPagination.fetch({
      ...searchCity.city,
      estate_id: (searchCity.estate) ? searchCity.estate.estate_id : null,
      limit: searchCity.limit,
      page: searchCity.page
    });
  }

}
