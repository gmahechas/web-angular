import { Injectable } from '@angular/core';

import { DestroyProfile } from '@web/app/features/c/profile/models/destroy-profile.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileDestroyGQL extends Mutation<DestroyProfile> {

document: DocumentNode = gql`
  mutation destroyProfile($profile_id: ID!) {
    destroyProfile(profile_id: $profile_id) {
      profile_id
      profile_name
    }
  }
`;

}
