import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/user.graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  queryRef: QueryRef<fromModels.PaginationUser>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchUser: fromModels.SearchUser) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationUser, fromModels.SearchUser>({
      query: fromGraphql.pagination,
      variables: {
        ...searchUser.user,
        person_id: (searchUser.person) ? searchUser.person.person_id : null,
        profile_id: (searchUser.profile) ? searchUser.profile.profile_id : null,
        limit: searchUser.limit,
        page: searchUser.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(user: fromModels.User) {
    return this.apollo.mutate<fromModels.StoreUser>({
      mutation: fromGraphql.store,
      variables: user
    });
  }

  update(user: fromModels.User) {
    return this.apollo.mutate<fromModels.UpdateUser>({
      mutation: fromGraphql.update,
      variables: user
    });
  }

  destroy(user: fromModels.User) {
    return this.apollo.mutate<fromModels.DestroyUser>({
      mutation: fromGraphql.destroy,
      variables: {
        user_id: user.user_id
      }
    });
  }

  pagination(searchUser: fromModels.SearchUser) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
      variables: {
        user_id: searchUser.user.user_id,
        username: searchUser.user.username,
        email: searchUser.user.email,
        person_id: (searchUser.person) ? searchUser.person.person_id : null,
        profile_id: (searchUser.profile) ? searchUser.profile.profile_id : null,
        limit: searchUser.limit,
        page: searchUser.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
