import { Injectable } from '@angular/core';

import { PaginationPerson } from '@web/app/features/c/person/models/pagination-person.model';

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
        person_identification
        person_identification_date_issue(format: "Y-m-d")
        person_first_name
        person_second_name
        person_first_surname
        person_second_surname
        person_legal_name
        person_address
        person_email
        person_phone
        type_person_id
        type_person {
          type_person_id
          type_person_code
          type_person_description
        }
        type_person_identification_id
        type_person_identification {
          type_person_identification_id
          type_person_identification_code
          type_person_identification_description
        }
        city_issue_id
        city_issue {
          city_id
          city_name
          city_code
        }
        city_location_id
        city_location {
          city_id
          city_name
          city_code
        }
      }
    }
  }
`;

}
