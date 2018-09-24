import { Injectable } from '@angular/core';

import * as fromGraphql from './../graphql';

import * as fromModels from './../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private projectPagination: fromGraphql.ProjectPaginationGQL,
    private projectStoreGQL: fromGraphql.ProjectStoreGQL,
    private projectUpdateGQL: fromGraphql.ProjectUpdateGQL,
    private projectDestroyGQL: fromGraphql.ProjectDestroyGQL
  ) { }

  load(searchProject: fromModels.SearchProject) {
    return this.projectPagination.watch({
      ...searchProject.project,
      macroproject_id: (searchProject.macroproject) ? searchProject.macroproject.macroproject_id : null,
      limit: searchProject.limit,
      page: searchProject.page
    }).valueChanges;
  }

  store(project: fromModels.Project) {
    return this.projectStoreGQL.mutate(project);
  }

  update(project: fromModels.Project) {
    return this.projectUpdateGQL.mutate(project);
  }

  destroy(project: fromModels.Project) {
    return this.projectDestroyGQL.mutate(project);
  }

  pagination(searchProject: fromModels.SearchProject) {
    return this.projectPagination.fetch({
      ...searchProject.project,
      macroproject_id: (searchProject.macroproject) ? searchProject.macroproject.macroproject_id : null,
      limit: searchProject.limit,
      page: searchProject.page
    });
  }

}
