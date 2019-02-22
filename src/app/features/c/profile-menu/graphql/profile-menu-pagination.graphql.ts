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
      profile_id
      menu_id
      menu {
        menu_id
        menu_name
        menu_title_case
        menu_upper_case
        menu_uri
        menu_parent_id
      }
    }
  }
`;

}
