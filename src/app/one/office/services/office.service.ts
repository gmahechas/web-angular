import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(
    private officePagination: fromGraphql.OfficePaginationGQL,
    private officeStoreGQL: fromGraphql.OfficeStoreGQL,
    private officeUpdateGQL: fromGraphql.OfficeUpdateGQL,
    private officeDestroyGQL: fromGraphql.OfficeDestroyGQL
  ) { }

  load(searchOffice: fromModels.SearchOffice) {
    return this.officePagination.watch({
      ...searchOffice.office,
      city_id: (searchOffice.city) ? searchOffice.city.city_id : null,
      limit: searchOffice.limit,
      page: searchOffice.page
    }).valueChanges;
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
    return this.officePagination.fetch({
      ...searchOffice.office,
      city_id: (searchOffice.city) ? searchOffice.city.city_id : null,
      limit: searchOffice.limit,
      page: searchOffice.page
    });
  }

}
