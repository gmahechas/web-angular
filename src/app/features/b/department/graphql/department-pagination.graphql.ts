import { Injectable } from '@angular/core';

import { PaginationDepartment } from '@web/app/features/b/department/models/pagination-department.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class DepartmentPaginationGQL extends Query<PaginationDepartment> {

  document: DocumentNode = gql`
    query paginationDepartment(
      $department_id: ID,
      $department_name: String,
      $limit: Int,
      $page: Int
    ) {
      paginationDepartment(
        department_id: $department_id,
        department_name: $department_name,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          department_id
          department_name
          department_description
        }
      }
    }
  `;
}
