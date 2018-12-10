import { Injectable } from '@angular/core';

import {
  StoreTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/store-type-person-identification.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonIdentificationStoreGQL extends Mutation<StoreTypePersonIdentification> {

  document: DocumentNode = gql`
    mutation storeTypePersonIdentification(
      $type_person_identification_code: String,
      $type_person_identification_description: String
    ) {
      storeTypePersonIdentification(
        type_person_identification_code: $type_person_identification_code,
        type_person_identification_description: $type_person_identification_description
      ) {
        type_person_identification_id
        type_person_identification_code
        type_person_identification_description
      }
    }
  `;

}
