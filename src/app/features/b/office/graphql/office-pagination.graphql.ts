import { Injectable } from '@angular/core';

import { PaginationOffice } from '@web/app/features/b/office/models/pagination-office.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficePaginationGQL extends Query<PaginationOffice> {

document: DocumentNode = gql`
  query paginationOffice(
    $office_id: ID,
    $office_name: String,
    $city_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationOffice(
      office_id: $office_id,
      office_name: $office_name,
      city_id: $city_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        office_id
        office_name
        company_id
        city_id
        city {
          city_id
          city_name
          city_code
        }
      }
    }
  }
`;

}
