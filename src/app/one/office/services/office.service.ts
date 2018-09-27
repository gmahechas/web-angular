import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  queryRef: QueryRef<fromModels.PaginationOffice>;

  constructor(
    private officePagination: fromGraphql.OfficePaginationGQL,
    private officeStoreGQL: fromGraphql.OfficeStoreGQL,
    private officeUpdateGQL: fromGraphql.OfficeUpdateGQL,
    private officeDestroyGQL: fromGraphql.OfficeDestroyGQL
  ) { }

  load(searchOffice: fromModels.SearchOffice) {
    this.queryRef = this.officePagination.watch({
      ...searchOffice.office,
      city_id: (searchOffice.city) ? searchOffice.city.city_id : null,
      limit: searchOffice.limit,
      page: searchOffice.page
    });

    return this.queryRef.valueChanges;
  }

  store(office: fromModels.Office) {
    return this.officeStoreGQL.mutate(office);
  }

  update(office: fromModels.Office) {
    return this.officeUpdateGQL.mutate(office);
  }

  destroy(office: fromModels.Office) {
    return this.officeDestroyGQL.mutate(office);
  }

  pagination(searchOffice: fromModels.SearchOffice) {

    return this.queryRef.fetchMore({
      query: this.officePagination.document,
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
