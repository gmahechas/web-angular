import { Injectable } from '@angular/core';

import { UpdateTypePerson } from '@web/app/features/c/type-person/models/update-type-person.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonUpdateGQL extends Mutation<UpdateTypePerson> {

  document: DocumentNode = gql`
    mutation updateTypePerson(
      $type_person_id: ID!,
      $type_person_code: String,
      $type_person_description: String
    ) {
        updateTypePerson(
          type_person_id: $type_person_id,
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
