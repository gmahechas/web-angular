import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
query paginationEstate($estate_id: ID, $limit: Int, $page: Int) {
  paginationEstate(estate_id: $estate_id, limit: $limit, page: $page) {
    total
    per_page
    current_page
    from
    to
    data {
      estate_id
      estate_name
      estate_code
      estate_created_at
      estate_updated_at
      estate_deleted_at
    }
  }
}
`;

export const store: DocumentNode = gql`
mutation storeEstate($estate_name: String, $estate_code: String, $country_id: ID!) {
  storeEstate(estate_name: $estate_name, estate_code: $estate_code, country_id: $country_id) {
    estate_id
    estate_name
    estate_code
    country_id
  }
}
`;

export const update: DocumentNode = gql`
mutation updateEstate($estate_id: ID!, $estate_name: String, $estate_code: String) {
    updateEstate(estate_id: $estate_id, estate_name: $estate_name, estate_code: $estate_code) {
      estate_id
      estate_name
      estate_code
      country_id
    }
}
`;

export const destroy: DocumentNode = gql`
mutation destroyEstate($estate_id: ID!) {
  destroyEstate(estate_id: $estate_id) {
    estate_id
    estate_name
    estate_code
    country_id
  }
}
`;
