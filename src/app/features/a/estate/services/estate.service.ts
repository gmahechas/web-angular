import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/a/estate/graphql';

import * as fromModels from '@web/app/features/a/estate/models';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  queryRef: QueryRef<fromModels.PaginationEstate>;

  constructor(
    private estatePaginationGQL: fromGraphql.EstatePaginationGQL,
    private estateStoreGQL: fromGraphql.EstateStoreGQL,
    private estateUpdateGQL: fromGraphql.EstateUpdateGQL,
    private estateDestroyGQL: fromGraphql.EstateDestroyGQL
  ) { }

  load(searchEstate: fromModels.SearchEstate) {
    this.queryRef = this.estatePaginationGQL.watch({
      ...searchEstate.estate,
      country_id: (searchEstate.country) ? searchEstate.country.country_id : null,
      limit: searchEstate.limit,
      page: searchEstate.page
    });

    return this.queryRef.valueChanges;
  }

  store(estate: fromModels.Estate) {
    return this.estateStoreGQL.mutate(estate);
  }

  update(estate: fromModels.Estate) {
    return this.estateUpdateGQL.mutate(estate);
  }

  destroy(estate: fromModels.Estate) {
    return this.estateDestroyGQL.mutate(estate);
  }

  pagination(searchEstate: fromModels.SearchEstate) {

    return this.queryRef.fetchMore({
      query: this.estatePaginationGQL.document,
      variables: {
        estate_id: searchEstate.estate.estate_id,
        estate_name: searchEstate.estate.estate_name,
        estate_code: searchEstate.estate.estate_code,
        country_id: (searchEstate.country) ? searchEstate.country.country_id : null,
        limit: searchEstate.limit,
        page: searchEstate.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
