import { Injectable } from '@angular/core';

import {
  PaginationTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/pagination-type-person-identification.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonIdentificationPaginationGQL extends Query<PaginationTypePersonIdentification> {

  document: DocumentNode = gql`
    query paginationTypePersonIdentification(
      $type_person_identification_id: ID,
      $type_person_identification_description: String,
      $limit: Int,
      $page: Int
    ) {
      paginationTypePersonIdentification(
        type_person_identification_id: $type_person_identification_id,
        type_person_identification_description: $type_person_identification_description,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          type_person_identification_id
          type_person_identification_code
          type_person_identification_description
        }
      }
    }
  `;
}
