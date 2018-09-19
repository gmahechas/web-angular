import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/office.graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  queryRef: QueryRef<fromModels.PaginationOffice>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchOffice: fromModels.SearchOffice) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationOffice, fromModels.SearchOffice>({
      query: fromGraphql.pagination,
      variables: {
        ...searchOffice.office,
        city_id: (searchOffice.city) ? searchOffice.city.city_id : null,
        limit: searchOffice.limit,
        page: searchOffice.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(office: fromModels.Office) {
    return this.apollo.mutate<fromModels.StoreOffice>({
      mutation: fromGraphql.store,
      variables: office
    });
  }

  update(office: fromModels.Office) {
    return this.apollo.mutate<fromModels.UpdateOffice>({
      mutation: fromGraphql.update,
      variables: office
    });
  }

  destroy(office: fromModels.Office) {
    return this.apollo.mutate<fromModels.DestroyOffice>({
      mutation: fromGraphql.destroy,
      variables: {
        office_id: office.office_id
      }
    });
  }

  pagination(searchOffice: fromModels.SearchOffice) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: {
        office_id: searchOffice.office.office_id,
        office_name: searchOffice.office.office_name,
        city_id: (searchOffice.city) ? searchOffice.city.city_id : null,
        limit: searchOffice.limit,
        page: searchOffice.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
