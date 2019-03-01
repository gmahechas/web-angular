import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/c/user-office/graphql';

import * as fromModels from '@web/app/features/c/user-office/models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeService {

  queryRef: QueryRef<fromModels.PaginationUserOffice>;

  constructor(
    private userOfficePaginationGQL: fromGraphql.UserOfficePaginationGQL,
    private userOfficeStoreGQL: fromGraphql.UserOfficeStoreGQL,
    private userOfficeUpdate: fromGraphql.UserOfficeUpdateGQL,
    private userOfficeDestroy: fromGraphql.UserOfficeDestroyGQL
  ) { }

  load(searchUserOffice: fromModels.SearchUserOffice) {
    this.queryRef = this.userOfficePaginationGQL.watch({
      ...searchUserOffice.user_office,
      user_id: (searchUserOffice.user) ? searchUserOffice.user.user_id : null,
      office_id: (searchUserOffice.office) ? searchUserOffice.office.office_id : null,
      limit: searchUserOffice.limit,
      page: searchUserOffice.page
    });

    return this.queryRef.valueChanges;
  }

  store(userOffice: fromModels.UserOffice) {
    return this.userOfficeStoreGQL.mutate(userOffice);
  }

  update(userOffice: fromModels.UserOffice) {
    return this.userOfficeUpdate.mutate(userOffice);
  }

  destroy(userOffice: fromModels.UserOffice) {
    return this.userOfficeDestroy.mutate(userOffice);
  }

  pagination(searchUserOffice: fromModels.SearchUserOffice) {

    return this.queryRef.fetchMore({
      query: this.userOfficePaginationGQL.document,
      variables: {
        user_office_id: searchUserOffice.user_office.user_office_id,
        user_office_status: searchUserOffice.user_office.user_office_status,
        user_id: (searchUserOffice.user) ? searchUserOffice.user.user_id : null,
        office_id: (searchUserOffice.office) ? searchUserOffice.office.office_id : null,
        limit: searchUserOffice.limit,
        page: searchUserOffice.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }
}
