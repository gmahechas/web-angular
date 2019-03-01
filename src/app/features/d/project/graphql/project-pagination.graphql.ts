import { Injectable } from '@angular/core';

import { PaginationProject } from '@web/app/features/d/project/models/pagination-project.model';

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
    $office_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationProject(
      project_id: $project_id,
      project_name: $project_name,
      macroproject_id: $macroproject_id,
      office_id: $office_id,
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
        macroproject_id
        macroproject {
          macroproject_id
          macroproject_name
          macroproject_address
          macroproject_phone
          city_id
          office_id
          office {
            office_id
            office_name
            company_id
            city_id
          }
        }
      }
    }
  }
`;

}
