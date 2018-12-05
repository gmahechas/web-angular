import { Injectable } from '@angular/core';

import { DestroyPerson } from '@web/app/features/c/person/models/destroy-person.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class PersonDestroyGQL extends Mutation<DestroyPerson> {

document: DocumentNode = gql`
  mutation destroyPerson($person_id: ID!) {
    destroyPerson(person_id: $person_id) {
      person_id
      person_business_type
      person_identification_type
      person_identification
      person_first_name
      person_second_name
      person_first_surname
      person_second_surname
      person_legal_name
      city_id
      city {
        city_id
        city_name
        city_code
      }
    }
  }
`;

}
