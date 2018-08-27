import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
query paginationProfile(
  $profile_id: ID,
  $profile_name: String,
  $limit: Int,
  $page: Int
) {
  paginationProfile(
    profile_id: $profile_id,
    profile_name: $profile_name,
    limit: $limit,
    page: $page
  ) {
    total
    per_page
    current_page
    from
    to
    data {
      profile_id
      profile_name
      profile_created_at
      profile_updated_at
      profile_deleted_at
    }
  }
}
`;

export const store: DocumentNode = gql`
mutation storeProfile($profile_name: String) {
  storeProfile(profile_name: $profile_name) {
    profile_id
    profile_name
    profile_created_at
    profile_updated_at
    profile_deleted_at
  }
}
`;

export const update: DocumentNode = gql`
mutation updateProfile($profile_id: ID!, $profile_name: String) {
    updateProfile(profile_id: $profile_id, profile_name: $profile_name) {
      profile_id
      profile_name
      profile_created_at
      profile_updated_at
      profile_deleted_at
    }
}
`;

export const destroy: DocumentNode = gql`
mutation destroyProfile($profile_id: ID!) {
  destroyProfile(profile_id: $profile_id) {
    profile_id
    profile_name
    profile_created_at
    profile_updated_at
    profile_deleted_at
  }
}
`;
