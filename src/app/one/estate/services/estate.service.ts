import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(
    private estatePagination: fromGraphql.EstatePaginationGQL,
    private estateStoreGQL: fromGraphql.EstateStoreGQL,
    private estateUpdateGQL: fromGraphql.EstateUpdateGQL,
    private estateDestroyGQL: fromGraphql.EstateDestroyGQL
  ) { }

  load(searchEstate: fromModels.SearchEstate) {
    return this.estatePagination.watch({
      ...searchEstate.estate,
      country_id: (searchEstate.country) ? searchEstate.country.country_id : null,
      limit: searchEstate.limit,
      page: searchEstate.page
    }).valueChanges;
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
    return this.estatePagination.fetch({
      ...searchEstate.estate,
      country_id: (searchEstate.country) ? searchEstate.country.country_id : null,
      limit: searchEstate.limit,
      page: searchEstate.page
    });
  }

}
