import { Injectable } from '@angular/core';

import { UpdatePerson } from '@web/app/features/c/person/models/update-person.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class PersonUpdateGQL extends Mutation<UpdatePerson> {

document: DocumentNode = gql`
  mutation updatePerson(
    $person_id: ID!,
    $person_identification: String,
    $person_first_name: String,
    $person_second_name: String,
    $person_first_surname: String,
    $person_second_surname: String,
    $person_legal_name: String,
    $type_person_id: ID,
    $type_person_identification_id: ID,
    $city_id: ID
  ) {
      updatePerson(
        person_id: $person_id,
        person_identification: $person_identification,
        person_first_name: $person_first_name,
        person_second_name: $person_second_name,
        person_first_surname: $person_first_surname,
        person_second_surname: $person_second_surname,
        person_legal_name: $person_legal_name,
        type_person_id: $type_person_id,
        type_person_identification_id: $type_person_identification_id,
        city_id: $city_id
      ) {
      person_id
      person_identification
      person_first_name
      person_second_name
      person_first_surname
      person_second_surname
      person_legal_name
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
