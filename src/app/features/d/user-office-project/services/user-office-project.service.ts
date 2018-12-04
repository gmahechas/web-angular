import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/d/user-office-project/graphql';

import * as fromModels from '@web/app/features/d/user-office-project/models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeProjectService {

  constructor(
    private userOfficeProjectPagination: fromGraphql.UserOfficeProjectPaginationGQL,
    private userOfficeProjectStoreGQL: fromGraphql.UserOfficeProjectStoreGQL,
    private userOfficeProjectUpdateGQL: fromGraphql.UserOfficeProjectUpdateGQL,
    private userOfficeProjectDestroyGQL: fromGraphql.UserOfficeProjectDestroyGQL
  ) { }

  load(searchUserOfficeProject: fromModels.SearchUserOfficeProject) {
    return this.userOfficeProjectPagination.watch({
      ...searchUserOfficeProject.user_office_project,
      user_office_id: (searchUserOfficeProject.user_office) ? searchUserOfficeProject.user_office.user_office_id : null,
      project: (searchUserOfficeProject.project) ? searchUserOfficeProject.project.project_id : null,
      limit: searchUserOfficeProject.limit,
      page: searchUserOfficeProject.page
    }).valueChanges;
  }

  store(userOfficeProject: fromModels.UserOfficeProject) {
    return this.userOfficeProjectStoreGQL.mutate(userOfficeProject);
  }

  update(userOfficeProject: fromModels.UserOfficeProject) {
    return this.userOfficeProjectUpdateGQL.mutate(userOfficeProject);
  }

  destroy(userOfficeProject: fromModels.UserOfficeProject) {
    return this.userOfficeProjectDestroyGQL.mutate(userOfficeProject);
  }

}
