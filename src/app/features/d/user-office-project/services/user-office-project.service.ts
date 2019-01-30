import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/d/user-office-project/graphql';

import * as fromModels from '@web/app/features/d/user-office-project/models';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeProjectService {

  constructor(
    private userOfficeProjectPaginationGQL: fromGraphql.UserOfficeProjectPaginationGQL,
    private userOfficeProjectStoreGQL: fromGraphql.UserOfficeProjectStoreGQL,
    private userOfficeProjectUpdateGQL: fromGraphql.UserOfficeProjectUpdateGQL,
    private userOfficeProjectDestroyGQL: fromGraphql.UserOfficeProjectDestroyGQL
  ) { }

  load(searchUserOfficeProject: fromModels.SearchUserOfficeProject) {
    return this.userOfficeProjectPaginationGQL.watch({
      ...searchUserOfficeProject.user_office_project,
      user_office_id: (searchUserOfficeProject.user_office) ? searchUserOfficeProject.user_office.user_office_id : null,
      project_id: (searchUserOfficeProject.project) ? searchUserOfficeProject.project.project_id : null,
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

  pagination(searchUserOfficeProject: fromModels.SearchUserOfficeProject) {
    return this.userOfficeProjectPaginationGQL.fetch({
      user_office_project_id: searchUserOfficeProject.user_office_project.user_office_project_id,
      user_office_project_status: searchUserOfficeProject.user_office_project.user_office_project_status,
      user_office_id: (searchUserOfficeProject.user_office) ? searchUserOfficeProject.user_office.user_office_id : null,
      project_id: (searchUserOfficeProject.project) ? searchUserOfficeProject.project.project_id : null,
      limit: searchUserOfficeProject.limit,
      page: searchUserOfficeProject.page
    });
  }

}
