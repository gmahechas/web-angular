import { Injectable } from '@angular/core';

import {
  DestroyTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/destroy-type-person-identification.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonIdentificationDestroyGQL extends Mutation<DestroyTypePersonIdentification> {

  document: DocumentNode = gql`
    mutation destroyTypePersonIdentification($type_person_identification_id: ID!) {
      destroyTypePersonIdentification(type_person_identification_id: $type_person_identification_id) {
        type_person_identification_id
        type_person_identification_code
        type_person_identification_description
      }
    }
  `;

}
