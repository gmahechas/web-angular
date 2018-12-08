import { Injectable } from '@angular/core';

import { PaginationTypePerson } from '@web/app/features/c/type-person/models/pagination-type-person.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonPaginationGQL extends Query<PaginationTypePerson> {

  document: DocumentNode = gql`
    query paginationTypePerson(
      $type_person_id: ID,
      $type_person_description: String,
      $limit: Int,
      $page: Int
    ) {
      paginationTypePerson(
        type_person_id: $type_person_id,
        type_person_description: $type_person_description,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          type_person_id
          type_person_code
          type_person_description
        }
      }
    }
  `;
}
