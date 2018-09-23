import { Injectable } from '@angular/core';

import { UpdateUser } from '../models/update-user.model';

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
`;

}
