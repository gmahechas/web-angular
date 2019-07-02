import { Injectable } from '@angular/core';

import { DestroyProfileMenu } from '@web/app/features/c/profile-menu/models/destroy-profile-menu.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileMenuDestroyGQL extends Mutation<DestroyProfileMenu> {

  document: DocumentNode = gql`
    mutation destroyProfileMenu($profile_menu_id: ID!) {
      destroyProfileMenu(profile_menu_id: $profile_menu_id) {
        profile_menu_id
        profile_menu_created_at
        profile_menu_updated_at
        profile_menu_deleted_at
      }
    }
  `;

}
