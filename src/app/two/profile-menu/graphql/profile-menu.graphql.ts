import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
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
    total
    per_page
    current_page
    from
    to
    data {
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
      }
    }
  }
}
`;
