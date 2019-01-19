import { Injectable } from '@angular/core';

import { StoreUser } from '@web/app/features/c/user/models/store-user.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserStoreGQL extends Mutation<StoreUser> {

document: DocumentNode = gql`
  mutation storeUser($username: String, $password: String, $person_id: ID, $profile_id: ID) {
    storeUser(username: $username, password: $password, person_id: $person_id, profile_id: $profile_id) {
      user_id
      username
      person_id
      profile_id
    }
  }
`;

}
