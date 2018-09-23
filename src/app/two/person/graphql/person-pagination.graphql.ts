import { Injectable } from '@angular/core';

import { PaginationPerson } from '../models/pagination-person.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class PersonPaginationGQL extends Query<PaginationPerson> {

document: DocumentNode = gql`
  query paginationPerson(
    $person_id: ID,
    $person_identification: String,
    $person_names: String,
    $limit: Int,
    $page: Int
  ) {
    paginationPerson(
      person_id: $person_id,
      person_identification: $person_identification,
      person_names: $person_names,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        person_id
        person_business_type
        person_identification_type
        person_identification
        person_first_name
        person_second_name
        person_first_surname
        person_second_surname
        person_legal_name
        person_created_at
        person_updated_at
        person_deleted_at
        city_id
        city {
          city_id
          city_name
          city_code
          city_created_at
          city_updated_at
          city_deleted_at
        }
      }
    }
  }
`;

}
