import { Injectable } from '@angular/core';

import { PaginationEstate } from '@web/app/features/a/estate/models/pagination-estate.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EstatePaginationGQL extends Query<PaginationEstate> {

  document: DocumentNode = gql`
    query paginationEstate(
      $estate_id: ID,
      $estate_name: String,
      $estate_code: String,
      $country_id: ID,
      $limit: Int,
      $page: Int
    ) {
      paginationEstate(
        estate_id: $estate_id,
        estate_name: $estate_name,
        estate_code: $estate_code,
        country_id: $country_id,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          estate_id
          estate_name
          estate_code
          country_id
          country {
            country_id
            country_name
            country_code
          }
        }
      }
    }
  `;
}
