import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/profile.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  queryRef: QueryRef<fromModels.PaginationProfile>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchProfile: fromModels.SearchProfile) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationProfile, fromModels.SearchProfile>({
      query: fromGraphql.pagination,
      variables: {
        ...searchProfile.profile,
        limit: searchProfile.limit,
        page: searchProfile.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(profile: fromModels.Profile): Observable<any> {
    return this.apollo.mutate<fromModels.StoreProfile>({
      mutation: fromGraphql.store,
      variables: profile
    });
  }

  update(profile: fromModels.Profile): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateProfile>({
      mutation: fromGraphql.update,
      variables: profile
    });
  }

  destroy(profile: fromModels.Profile): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyProfile>({
      mutation: fromGraphql.destroy,
      variables: {
        profile_id: profile.profile_id
      }
    });
  }

  pagination(searchProfile: fromModels.SearchProfile) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
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
