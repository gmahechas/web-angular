import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/d/project/graphql';

import * as fromModels from '@web/app/features/d/project/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  queryRef: QueryRef<fromModels.PaginationProject>;

  constructor(
    private projectPaginationGQL: fromGraphql.ProjectPaginationGQL,
    private projectStoreGQL: fromGraphql.ProjectStoreGQL,
    private projectUpdateGQL: fromGraphql.ProjectUpdateGQL,
    private projectDestroyGQL: fromGraphql.ProjectDestroyGQL
  ) { }

  load(searchProject: fromModels.SearchProject) {
    this.queryRef = this.projectPaginationGQL.watch({
      ...searchProject.project,
      macroproject_id: (searchProject.macroproject) ? searchProject.macroproject.macroproject_id : null,
      limit: searchProject.limit,
      page: searchProject.page
    });

    return this.queryRef.valueChanges;
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
      query: this.projectPaginationGQL.document,
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
