import { Injectable } from '@angular/core';

import { DestroyTypePerson } from '@web/app/features/c/type-person/models/destroy-type-person.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class TypePersonDestroyGQL extends Mutation<DestroyTypePerson> {

  document: DocumentNode = gql`
    mutation destroyTypePerson($type_person_id: ID!) {
      destroyTypePerson(type_person_id: $type_person_id) {
        type_person_id
        type_person_code
        type_person_description
      }
    }
  `;

}
