import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/b/office-department/graphql';

import * as fromModels from '@web/app/features/b/office-department/models';

@Injectable({
  providedIn: 'root'
})
export class OfficeDepartmentService {

  constructor(
    private officeDepartmentPaginationGQL: fromGraphql.OfficeDepartmentPaginationGQL,
    private officeDepartmentStoreGQL: fromGraphql.OfficeDepartmentStoreGQL,
    private officeDepartmentUpdateGQL: fromGraphql.OfficeDepartmentUpdateGQL,
    private officeDepartmentDestroyGQL: fromGraphql.OfficeDepartmentDestroyGQL
  ) { }

  load(searchOfficeDepartment: fromModels.SearchOfficeDepartment) {
    return this.officeDepartmentPaginationGQL.watch({
      ...searchOfficeDepartment.office_department,
      office_id: (searchOfficeDepartment.office) ? searchOfficeDepartment.office.office_id : null,
      department_id: (searchOfficeDepartment.department) ? searchOfficeDepartment.department.department_id : null,
      limit: searchOfficeDepartment.limit,
      page: searchOfficeDepartment.page
    }).valueChanges;
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

}
