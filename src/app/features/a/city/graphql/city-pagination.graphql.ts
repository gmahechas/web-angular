import { Injectable } from '@angular/core';

import { PaginationCity } from '@web/app/features/a/city/models/pagination-city.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CityPaginationGQL extends Query<PaginationCity> {

document: DocumentNode = gql`
  query paginationCity(
    $city_id: ID,
    $city_name: String,
    $city_code: String,
    $estate_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationCity(
      city_id: $city_id,
      city_name: $city_name,
      city_code: $city_code,
      estate_id: $estate_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        city_id
        city_name
        city_code
        estate_id
        estate {
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
  }
`;
}
