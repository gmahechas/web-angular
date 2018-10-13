import { Injectable } from '@angular/core';

import { DestroyUserOffice } from '@web/app/two/user-office/models/destroy-user-office.model';

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
        user_office_created_at
        user_office_updated_at
        user_office_deleted_at
        user_id
        user {
          user_id
          username
          email
          password
          remember_token
          user_created_at
          user_updated_at
          user_deleted_at
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
            person_created_at
            person_updated_at
            person_deleted_at
            city_id
          }
          profile_id
        }
        office_id
        office {
          office_id
          office_name
          office_created_at
          office_updated_at
          office_deleted_at
          company_id
          city_id
        }
      }
    }
  `;

}
