import { Injectable } from '@angular/core';

import { PaginationUser } from '../models/pagination-user.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserPaginationGQL extends Query<PaginationUser> {

document: DocumentNode = gql`
  query paginationUser(
    $user_id: ID,
    $username: String,
    $email: String,
    $person_id: ID,
    $profile_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationUser(
      user_id: $user_id,
      username: $username,
      email: $email,
      person_id: $person_id,
      profile_id: $profile_id,
      limit: $limit,
      page: $page
    ) {
      total
      per_page
      current_page
      from
      to
      data {
        user_id
        username
        email
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
          person_created_at
          person_updated_at
          person_deleted_at
        }
        profile_id
        profile {
          profile_id
          profile_name
          profile_created_at
          profile_updated_at
          profile_deleted_at
        }
      }
    }
  }
`;

}
