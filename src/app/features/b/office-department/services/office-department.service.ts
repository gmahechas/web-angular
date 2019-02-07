import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/b/office-department/graphql';

import * as fromModels from '@web/app/features/b/office-department/models';

@Injectable({
  providedIn: 'root'
})
export class OfficeDepartmentService {

  queryRef: QueryRef<fromModels.PaginationOfficeDepartment>;

  constructor(
    private officeDepartmentPaginationGQL: fromGraphql.OfficeDepartmentPaginationGQL,
    private officeDepartmentStoreGQL: fromGraphql.OfficeDepartmentStoreGQL,
    private officeDepartmentUpdateGQL: fromGraphql.OfficeDepartmentUpdateGQL,
    private officeDepartmentDestroyGQL: fromGraphql.OfficeDepartmentDestroyGQL
  ) { }

  load(searchOfficeDepartment: fromModels.SearchOfficeDepartment) {
    this.queryRef = this.officeDepartmentPaginationGQL.watch({
      ...searchOfficeDepartment.office_department,
      office_id: (searchOfficeDepartment.office) ? searchOfficeDepartment.office.office_id : null,
      department_id: (searchOfficeDepartment.department) ? searchOfficeDepartment.department.department_id : null,
      limit: searchOfficeDepartment.limit,
      page: searchOfficeDepartment.page
    });

    return this.queryRef.valueChanges;
  }

  store(officeDepartment: fromModels.OfficeDepartment) {
    return this.officeDepartmentStoreGQL.mutate(officeDepartment);
  }

  update(officeDepartment: fromModels.OfficeDepartment) {
    return this.officeDepartmentUpdateGQL.mutate(officeDepartment);
  }

  destroy(officeDepartment: fromModels.OfficeDepartment) {
    return this.officeDepartmentDestroyGQL.mutate(officeDepartment);
  }

  pagination(searchOfficeDepartment: fromModels.SearchOfficeDepartment) {

    return this.queryRef.fetchMore({
      query: this.officeDepartmentPaginationGQL.document,
      variables: {
        office_department_id: searchOfficeDepartment.office_department.office_department_id,
        office_department_status: searchOfficeDepartment.office_department.office_department_status,
        office_id: (searchOfficeDepartment.office) ? searchOfficeDepartment.office.office_id : null,
        department_id: (searchOfficeDepartment) ? searchOfficeDepartment.department.department_id : null,
        limit: searchOfficeDepartment.limit,
        page: searchOfficeDepartment.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
