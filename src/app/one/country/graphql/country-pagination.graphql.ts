import { Injectable } from '@angular/core';

import { PaginationCountry } from '@app/app/one/country/models/pagination-country.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CountryPaginationGQL extends Query<PaginationCountry> {

  document: DocumentNode = gql`
    query paginationCountry(
      $country_id: ID,
      $country_name: String,
      $country_code: String,
      $limit: Int,
      $page: Int
    ) {
      paginationCountry(
        country_id: $country_id,
        country_name: $country_name,
        country_code: $country_code,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          country_id
          country_name
          country_code
          country_created_at
          country_updated_at
          country_deleted_at
        }
      }
    }
  `;
}
