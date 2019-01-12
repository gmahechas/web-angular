import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/b/department/graphql';

import * as fromModels from '@web/app/features/b/department/models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private departmentPagination: fromGraphql.DepartmentPaginationGQL,
    private departmentStoreGQL: fromGraphql.DepartmentStoreGQL,
    private departmentUpdateGQL: fromGraphql.DepartmentUpdateGQL,
    private departmentDestroyGQL: fromGraphql.DepartmentDestroyGQL
  ) { }

  load(searchDepartment: fromModels.SearchDepartment) {
    return this.departmentPagination.watch({
      ...searchDepartment.department,
      limit: searchDepartment.limit,
      page: searchDepartment.page
    }).valueChanges;
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
    return this.departmentPagination.fetch({
      department_id: searchDepartment.department.department_id,
      limit: searchDepartment.limit,
      page: searchDepartment.page
    });
  }

}
