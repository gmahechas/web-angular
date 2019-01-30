import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/b/department/graphql';

import * as fromModels from '@web/app/features/b/department/models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  queryRef: QueryRef<fromModels.PaginationDepartment>;

  constructor(
    private departmentPaginationGQL: fromGraphql.DepartmentPaginationGQL,
    private departmentStoreGQL: fromGraphql.DepartmentStoreGQL,
    private departmentUpdateGQL: fromGraphql.DepartmentUpdateGQL,
    private departmentDestroyGQL: fromGraphql.DepartmentDestroyGQL
  ) { }

  load(searchDepartment: fromModels.SearchDepartment) {
    this.queryRef = this.departmentPaginationGQL.watch({
      ...searchDepartment.department,
      limit: searchDepartment.limit,
      page: searchDepartment.page
    });

    return this.queryRef.valueChanges;
  }

  store(department: fromModels.Department) {
    return this.departmentStoreGQL.mutate(department);
  }

  update(department: fromModels.Department) {
    return this.departmentUpdateGQL.mutate(department);
  }

  destroy(department: fromModels.Department) {
    return this.departmentDestroyGQL.mutate(department);
  }

  pagination(searchDepartment: fromModels.SearchDepartment) {

    return this.queryRef.fetchMore({
      query: this.departmentPaginationGQL.document,
      variables: {
        department_id: searchDepartment.department.department_id,
        limit: searchDepartment.limit,
        page: searchDepartment.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return fetchMoreResult;
      }
    });
  }

}
