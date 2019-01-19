import { Injectable } from '@angular/core';

import { PaginationUser } from '@web/app/features/c/user/models/pagination-user.model';

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
    $person_id: ID,
    $profile_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationUser(
      user_id: $user_id,
      username: $username,
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
        person_id
        person {
          person_id
          person_identification
          person_first_name
          person_second_name
          person_first_surname
          person_second_surname
        }
        profile_id
        profile {
          profile_id
          profile_name
        }
      }
    }
  }
`;

}
