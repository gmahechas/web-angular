import { Injectable } from '@angular/core';

import { UpdateUserOffice } from '@web/app/features/c/user-office/models/update-user-office.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficeUpdateGQL extends Mutation<UpdateUserOffice> {

  document: DocumentNode = gql`
    mutation updateUserOffice($user_office_id: ID!, $user_office_status: Boolean!) {
      updateUserOffice(user_office_id: $user_office_id, user_office_status: $user_office_status) {
        user_office_id
        user_office_status
        user_id
        user {
          user_id
          username
          person_id
          person {
            person_id
            person_identification
            person_identification_date_issue
            person_first_name
            person_second_name
            person_first_surname
            person_second_surname
            person_legal_name
            person_address
            person_email
            person_phone
            type_person_id
            type_person_identification_id
            city_issue_id
            city_location_id
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
