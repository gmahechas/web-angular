import { Injectable } from '@angular/core';

import { PaginationOfficeDepartment } from '@web/app/features/b/office-department/models/pagination-office-department.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeDepartmentPaginationGQL extends Query<PaginationOfficeDepartment> {

  document: DocumentNode = gql`
    query paginationOfficeDepartment(
      $office_department_id: ID,
      $office_department_status: Boolean,
      $office_id: ID,
      $department_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationOfficeDepartment(
        office_department_id: $office_department_id,
        office_department_status: $office_department_status,
        office_id: $office_id,
        department_id: $department_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          office_department_id
          office_department_status
          office_id
          office {
            office_id
            office_name
          }
          department_id
          department {
            department_id
            department_name
          }
        }
      }
    }
  `;
}
