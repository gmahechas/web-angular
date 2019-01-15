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
`;

}
