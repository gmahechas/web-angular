import { Injectable } from '@angular/core';

import { DestroyUser } from '@web/app/two/user/models/destroy-user.model';

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
      email
      user_created_at
      user_updated_at
      user_deleted_at
      person_id
      profile_id
    }
  }
`;

}
