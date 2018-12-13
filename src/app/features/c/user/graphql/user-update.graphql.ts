import { Injectable } from '@angular/core';

import { UpdateUser } from '@web/app/features/c/user/models/update-user.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateGQL extends Mutation<UpdateUser> {

document: DocumentNode = gql`
  mutation updateUser(
    $user_id: ID!, $username: String, $email: String,
    $password: String, $person_id: ID, $profile_id: ID
    ) {
      updateUser(
        user_id: $user_id, username: $username, email: $email,
        password: $password, person_id: $person_id, profile_id: $profile_id
        ) {
        user_id
        username
        email
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
`;

}
