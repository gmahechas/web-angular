import { Injectable } from '@angular/core';

import { StoreTypePerson } from '@web/app/features/c/type-person/models/store-type-person.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonStoreGQL extends Mutation<StoreTypePerson> {

  document: DocumentNode = gql`
    mutation storeTypePerson(
      $type_person_code: String,
      $type_person_description: String
    ) {
      storeTypePerson(
        type_person_code: $type_person_code,
        type_person_description: $type_person_description
      ) {
        type_person_id
        type_person_code
        type_person_description
      }
    }
  `;

}
