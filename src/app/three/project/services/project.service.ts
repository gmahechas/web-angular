import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@app/app/three/project/graphql';

import * as fromModels from '@app/app/three/project/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  queryRef: QueryRef<fromModels.PaginationProject>;

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
    return this.queryRef.fetchMore({
      query: this.projectPagination.document,
      variables: {
        project_id: searchProject.project.project_id,
        project_name: searchProject.project.project_name,
        macroproject_id: (searchProject.macroproject) ? searchProject.macroproject.macroproject_id : null,
        limit: searchProject.limit,
        page: searchProject.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
