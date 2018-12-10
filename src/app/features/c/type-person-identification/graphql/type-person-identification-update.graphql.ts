import { Injectable } from '@angular/core';

import {
  UpdateTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/update-type-person-identification.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonIdentificationUpdateGQL extends Mutation<UpdateTypePersonIdentification> {

  document: DocumentNode = gql`
    mutation updateTypePersonIdentification(
      $type_person_identification_id: ID!,
      $type_person_identification_code: String,
      $type_person_identification_description: String
    ) {
        updateTypePersonIdentification(
          type_person_identification_id: $type_person_identification_id,
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
