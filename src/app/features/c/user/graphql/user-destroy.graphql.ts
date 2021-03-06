import { Injectable } from '@angular/core';

import { DestroyUser } from '@web/app/features/c/user/models/destroy-user.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class UserDestroyGQL extends Mutation<DestroyUser> {

document: DocumentNode = gql`
  mutation destroyUser($user_id: ID!) {
    destroyUser(user_id: $user_id) {
      user_id
      username
      person_id
      profile_id
    }
  }
`;

}
