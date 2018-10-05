import { Injectable } from '@angular/core';

import { PaginationProject } from '@app/app/three/project/models/pagination-project.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProjectPaginationGQL extends Query<PaginationProject> {

document: DocumentNode = gql`
  query paginationProject(
    $project_id: ID,
    $project_name: String,
    $macroproject_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationProject(
      project_id: $project_id,
      project_name: $project_name,
      macroproject_id: $macroproject_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        project_id
        project_name
        project_address
        project_phone
        project_created_at
        project_updated_at
        project_deleted_at
        macroproject_id
        macroproject {
          macroproject_id
          macroproject_name
          macroproject_address
          macroproject_phone
          macroproject_created_at
          macroproject_updated_at
          macroproject_deleted_at
          city_id
          office_id
        }
      }
    }
  }
`;

}
