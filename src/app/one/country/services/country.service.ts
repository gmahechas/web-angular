import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/country.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable()
export class CountryService {

  queryRef: QueryRef<fromModels.PaginationCountry>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchCountry: fromModels.SearchCountry) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationCountry, fromModels.SearchCountry>({
      query: fromGraphql.pagination,
      variables: searchCountry
    });

    return this.queryRef.valueChanges;
  }

  store(country: fromModels.Country): Observable<any> {
    return this.apollo.mutate<fromModels.StoreCountry>({
      mutation: fromGraphql.store,
      variables: country
    });
  }

  update(country: fromModels.Country): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateCountry>({
      mutation: fromGraphql.update,
      variables: country
    });
  }

  destroy(country: fromModels.Country): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyCountry>({
      mutation: fromGraphql.destroy,
      variables: {
        country_id: country.country_id
      }
    });
  }

  pagination(searchCountry: fromModels.SearchCountry) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: searchCountry,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult.data;
      }
    });
  }

}
