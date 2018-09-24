import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeService {

  constructor(
    private userOfficePagination: fromGraphql.UserOfficePaginationGQL
  ) { }

  load(searchUserOffice: fromModels.SearchUserOffice) {
    return this.userOfficePagination.watch({
      ...searchUserOffice.user_office,
      user_id: (searchUserOffice.user) ? searchUserOffice.user.user_id : null,
      limit: searchUserOffice.limit,
      page: searchUserOffice.page
    }).valueChanges;
  }

}
