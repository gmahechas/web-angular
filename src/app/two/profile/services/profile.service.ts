import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  queryRef: QueryRef<fromModels.PaginationProfile>;

  constructor(
    private profilePagination: fromGraphql.ProfilePaginationGQL,
    private profileStoreGQL: fromGraphql.ProfileStoreGQL,
    private profileUpdateGQL: fromGraphql.ProfileUpdateGQL,
    private profileDestroyGQL: fromGraphql.ProfileDestroyGQL
  ) { }

  load(searchProfile: fromModels.SearchProfile) {
    this.queryRef = this.profilePagination.watch({
      ...searchProfile.profile,
      limit: searchProfile.limit,
      page: searchProfile.page
    });

    return this.queryRef.valueChanges;
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

    return this.queryRef.fetchMore({
      query: this.profilePagination.document,
      variables: {
        profile_id: searchProfile.profile.profile_id,
        profile_name: searchProfile.profile.profile_name,
        limit: searchProfile.limit,
        page: searchProfile.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
