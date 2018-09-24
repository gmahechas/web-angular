import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private profilePagination: fromGraphql.ProfilePaginationGQL,
    private profileStoreGQL: fromGraphql.ProfileStoreGQL,
    private profileUpdateGQL: fromGraphql.ProfileUpdateGQL,
    private profileDestroyGQL: fromGraphql.ProfileDestroyGQL
  ) { }

  load(searchProfile: fromModels.SearchProfile) {
    return this.profilePagination.watch({
      ...searchProfile.profile,
      limit: searchProfile.limit,
      page: searchProfile.page
    }).valueChanges;
  }

  store(profile: fromModels.Profile) {
    return this.profileStoreGQL.mutate(profile);
  }

  update(profile: fromModels.Profile) {
    return this.profileUpdateGQL.mutate(profile);
  }

  destroy(profile: fromModels.Profile) {
    return this.profileDestroyGQL.mutate(profile);
  }

  pagination(searchProfile: fromModels.SearchProfile) {
    return this.profilePagination.fetch({
      ...searchProfile.profile,
      limit: searchProfile.limit,
      page: searchProfile.page
    });
  }

}
