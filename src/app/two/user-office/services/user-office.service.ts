import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/two/user-office/graphql';

import * as fromModels from '@web/app/two/user-office/models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeService {

  constructor(
    private userOfficePagination: fromGraphql.UserOfficePaginationGQL,
    private userOfficeUpdate: fromGraphql.UserOfficeUpdateGQL,
    private userOfficeDestroy: fromGraphql.UserOfficeDestroyGQL
  ) { }

  load(searchUserOffice: fromModels.SearchUserOffice) {
    return this.userOfficePagination.watch({
      ...searchUserOffice.user_office,
      user_id: (searchUserOffice.user) ? searchUserOffice.user.user_id : null,
      office_id: (searchUserOffice.office) ? searchUserOffice.office.office_id : null,
      limit: searchUserOffice.limit,
      page: searchUserOffice.page
    }).valueChanges;
  }

  update(userOffice: fromModels.UserOffice) {
    return this.userOfficeUpdate.mutate(userOffice);
  }

  destroy(userOffice: fromModels.UserOffice) {
    return this.userOfficeDestroy.mutate(userOffice);
  }

}
