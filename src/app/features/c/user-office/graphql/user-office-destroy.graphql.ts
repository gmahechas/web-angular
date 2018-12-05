import { Injectable } from '@angular/core';

import { DestroyUserOffice } from '@web/app/features/c/user-office/models/destroy-user-office.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeDestroyGQL extends Mutation<DestroyUserOffice> {

  document: DocumentNode = gql`
    mutation destroyUserOffice($user_office_id: ID!) {
      destroyUserOffice(user_office_id: $user_office_id) {
        user_office_id
        user_office_status
        user_id
        user {
          user_id
          username
          email
          password
          remember_token
          person_id
          person {
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
          }
          profile_id
        }
        office_id
        office {
          office_id
          office_name
          company_id
          city_id
        }
      }
    }
  `;

}
