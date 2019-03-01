import { Injectable } from '@angular/core';

import { PaginationUserOffice } from '@web/app/features/c/user-office/models/pagination-user-office.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserOfficePaginationGQL extends Query<PaginationUserOffice> {

document: DocumentNode = gql`
  query paginationUserOffice(
    $user_office_id: ID,
    $user_office_status: Boolean,
    $user_id: ID,
    $username: String,
    $office_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationUserOffice(
      user_office_id: $user_office_id,
      user_office_status: $user_office_status,
      user_id: $user_id,
      username: $username,
      office_id: $office_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
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
  }
`;
}
