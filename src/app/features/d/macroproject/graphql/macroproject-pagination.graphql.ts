import { Injectable } from '@angular/core';

import { PaginationMacroproject } from '@web/app/features/d/macroproject/models/pagination-macroproject.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class MacroprojectPaginationGQL extends Query<PaginationMacroproject> {

document: DocumentNode = gql`
  query paginationMacroproject(
    $macroproject_id: ID,
    $macroproject_name: String,
    $city_id: ID,
    $office_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationMacroproject(
      macroproject_id: $macroproject_id,
      macroproject_name: $macroproject_name,
      city_id: $city_id,
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
        macroproject_id
        macroproject_name
        macroproject_address
        macroproject_phone
        city_id
        city {
          city_id
          city_name
          city_code
        }
        office_id
        office {
          office_id
          office_name
        }
      }
    }
  }
`;

}
