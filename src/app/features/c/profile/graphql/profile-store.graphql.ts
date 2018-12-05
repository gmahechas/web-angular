import { Injectable } from '@angular/core';

import { StoreProfile } from '@web/app/features/c/profile/models/store-profile.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileStoreGQL extends Mutation<StoreProfile> {

document: DocumentNode = gql`
  mutation storeProfile($profile_name: String) {
    storeProfile(profile_name: $profile_name) {
      profile_id
      profile_name
    }
  }
`;

}
