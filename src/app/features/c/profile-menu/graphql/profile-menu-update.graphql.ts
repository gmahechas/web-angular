import { Injectable } from '@angular/core';

import { UpdateProfileMenu } from '@web/app/features/c/profile-menu/models/update-profile-menu.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileMenuUpdateGQL extends Mutation<UpdateProfileMenu> {

  document: DocumentNode = gql`
    mutation updateProfileMenu($profile_menu_id: ID!) {
        updateProfileMenu(profile_menu_id: $profile_menu_id) {
          profile_menu_id
          profile_menu_created_at
          profile_menu_updated_at
          profile_menu_deleted_at
        }
    }
  `;

}
