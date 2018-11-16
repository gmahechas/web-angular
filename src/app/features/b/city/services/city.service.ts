import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/b/city/graphql';

import * as fromModels from '@web/app/features/b/city/models';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  queryRef: QueryRef<fromModels.PaginationCity>;

  constructor(
    private cityPagination: fromGraphql.CityPaginationGQL,
    private cityStoreGQL: fromGraphql.CityStoreGQL,
    private cityUpdateGQL: fromGraphql.CityUpdateGQL,
    private cityDestroyGQL: fromGraphql.CityDestroyGQL
  ) { }

  load(searchCity: fromModels.SearchCity) {
    this.queryRef = this.cityPagination.watch({
      ...searchCity.city,
      estate_id: (searchCity.estate) ? searchCity.estate.estate_id : null,
      limit: searchCity.limit,
      page: searchCity.page
    });

    return this.queryRef.valueChanges;
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

    return this.queryRef.fetchMore({
      query: this.cityPagination.document,
      variables: {
        city_id: searchCity.city.city_id,
        city_name: searchCity.city.city_name,
        city_code: searchCity.city.city_code,
        estate_id: (searchCity.estate) ? searchCity.estate.estate_id : null,
        limit: searchCity.limit,
        page: searchCity.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
