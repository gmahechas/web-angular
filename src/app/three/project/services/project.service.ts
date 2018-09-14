import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import * as fromGraphql from './../graphql/project.graphql';

import * as fromModels from './../models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  queryRef: QueryRef<fromModels.PaginationProject>;

  constructor(
    private apollo: Apollo
  ) { }

  load(searchProject: fromModels.SearchProject) {
    this.queryRef = this.apollo.watchQuery<fromModels.PaginationProject, fromModels.SearchProject>({
      query: fromGraphql.pagination,
      variables: {
        ...searchProject.project,
        macroproject_id: (searchProject.macroproject) ? searchProject.macroproject.macroproject_id : null,
        limit: searchProject.limit,
        page: searchProject.page
      }
    });

    return this.queryRef.valueChanges;
  }

  store(project: fromModels.Project): Observable<any> {
    return this.apollo.mutate<fromModels.StoreProject>({
      mutation: fromGraphql.store,
      variables: project
    });
  }

  update(project: fromModels.Project): Observable<any> {
    return this.apollo.mutate<fromModels.UpdateProject>({
      mutation: fromGraphql.update,
      variables: project
    });
  }

  destroy(project: fromModels.Project): Observable<any> {
    return this.apollo.mutate<fromModels.DestroyProject>({
      mutation: fromGraphql.destroy,
      variables: {
        project_id: project.project_id
      }
    });
  }

  pagination(searchProject: fromModels.SearchProject) {
    return this.queryRef.fetchMore({
      query: fromGraphql.pagination,
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
