import { Injectable } from '@angular/core';

import { PaginationUserOfficeProject } from '@web/app/features/d/user-office-project/models/pagination-user-office-project.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeProjectPaginationGQL extends Query<PaginationUserOfficeProject> {

  document: DocumentNode = gql`
    query paginationUserOfficeProject(
      $user_office_project_id: ID,
      $user_office_project_status: Boolean,
      $user_office_id: ID,
      $project_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationUserOfficeProject(
        user_office_project_id: $user_office_project_id,
        user_office_project_status: $user_office_project_status,
        user_office_id: $user_office_id,
        project_id: $project_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          user_office_project_id
          user_office_project_status
          user_office_project_created_at
          user_office_project_updated_at
          user_office_project_deleted_at
          user_office_id
          project_id
        }
      }
    }
  `;
}
