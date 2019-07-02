import { Injectable } from '@angular/core';

import { StoreProfileMenu } from '@web/app/features/c/profile-menu/models/store-profile-menu.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileMenuStoreGQL extends Mutation<StoreProfileMenu> {

  document: DocumentNode = gql`
    mutation storeProfileMenu(
      $profile_menu_status: Boolean
    ) {
      storeProfileMenu(
        profile_menu_status: $profile_menu_status,
      ) {
        profile_menu_id
        profile_menu_status
        profile_id
        menu_id
      }
    }
  `;

}
