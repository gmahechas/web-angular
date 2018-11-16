import { Injectable } from '@angular/core';

import { PaginationProfileMenu } from '@web/app/features/c/profile-menu/models/pagination-profile-menu.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProfileMenuPaginationGQL extends Query<PaginationProfileMenu> {

document: DocumentNode = gql`
  query paginationProfileMenu(
    $profile_menu_id: ID,
    $profile_menu_status: String,
    $profile_id: ID,
    $limit: Int,
    $page: Int
  ) {
    paginationProfileMenu(
      profile_menu_id: $profile_menu_id,
      profile_menu_status: $profile_menu_status,
      profile_id: $profile_id,
      limit: $limit,
      page: $page
    ) {
      profile_menu_id
      profile_menu_status
      profile_menu_created_at
      profile_menu_updated_at
      profile_menu_deleted_at
      profile_id
      menu_id
      menu {
        menu_id
        menu_name
        menu_uri
        menu_created_at
        menu_updated_at
        menu_deleted_at
        menu_parent_id
      }
    }
  }
`;

}
