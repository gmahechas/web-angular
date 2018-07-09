import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/city.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  queryRef: QueryRef<fromModels.PaginationCity>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchCity: fromModels.SearchCity) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationCity, fromModels.SearchCity>({
      query: fromGraphql.pagination,
      variables: {
        ...searchCity.city,
        limit: searchCity.limit,
        page: searchCity.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(city: fromModels.City): Observable<any> {
    console.log(city);
    return this.apollo.mutate<fromModels.StoreCity>({
      mutation: fromGraphql.store,
      variables: city
    });
  }

  update(city: fromModels.City): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateCity>({
      mutation: fromGraphql.update,
      variables: city
    });
  }

  destroy(city: fromModels.City): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyCity>({
      mutation: fromGraphql.destroy,
      variables: {
        city_id: city.city_id
      }
    });
  }

  pagination(searchCity: fromModels.SearchCity) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: {
        city_id: searchCity.city.city_id,
        city_name: searchCity.city.city_name,
        city_code: searchCity.city.city_code,
        estate_id: (searchCity.estate) ? searchCity.estate.estate_id : '',
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
