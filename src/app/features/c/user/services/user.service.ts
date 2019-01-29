import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/c/user/graphql';

import * as fromModels from '@web/app/features/c/user/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  queryRef: QueryRef<fromModels.PaginationUser>;

  constructor(
    private userPaginationGQL: fromGraphql.UserPaginationGQL,
    private userStoreGQL: fromGraphql.UserStoreGQL,
    private userUpdateGQL: fromGraphql.UserUpdateGQL,
    private userDestroyGQL: fromGraphql.UserDestroyGQL
  ) { }

  load(searchUser: fromModels.SearchUser) {
    this.queryRef = this.userPaginationGQL.watch({
      ...searchUser.user,
      person_id: (searchUser.person) ? searchUser.person.person_id : null,
      profile_id: (searchUser.profile) ? searchUser.profile.profile_id : null,
      limit: searchUser.limit,
      page: searchUser.page
    });

    return this.queryRef.valueChanges;
  }

  store(user: fromModels.User) {
    return this.userStoreGQL.mutate(user);
  }

  update(user: fromModels.User) {
    return this.userUpdateGQL.mutate(user);
  }

  destroy(user: fromModels.User) {
    return this.userDestroyGQL.mutate(user);
  }

  pagination(searchUser: fromModels.SearchUser) {
    return this.queryRef.fetchMore({
      query: this.userPaginationGQL,
      variables: {
        user_id: searchUser.user.user_id,
        username: searchUser.user.username,
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
