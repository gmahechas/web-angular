import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import * as fromGraphql from './../graphql/user-office.graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeService {

  constructor(
    private apollo: Apollo
  ) { }

  load(searchUserOffice: fromModels.SearchUserOffice) {
    return this.apollo.watchQuery<fromModels.PaginationUserOffice, fromModels.SearchUserOffice>({
      query: fromGraphql.pagination,
      variables: {
        ...searchUserOffice.user_office,
        user_id: (searchUserOffice.user) ? searchUserOffice.user.user_id : null,
        limit: searchUserOffice.limit,
        page: searchUserOffice.page
      }
    }).valueChanges;
  }

}
