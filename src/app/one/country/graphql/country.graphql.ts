import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const paginationCountry: DocumentNode = gql`
query PaginationCountry($country_id: ID, $country_name: String, $country_code: String, $limit: Int, $page: Int) {
  paginationCountry(country_id: $country_id, country_name: $country_name, country_code: $country_code, limit: $limit, page: $page) {
    total
    per_page
    current_page
    from
    to
    data {
      country_id
      country_name
      country_code
      country_created_at
      country_updated_at
      country_deleted_at
    }
  }
}
`;

export const storeCountry: DocumentNode = gql`
mutation storeCountry($country_name: String, $country_code: String) {
  storeCountry(country_name: $country_name, country_code: $country_code) {
    country_id
    country_name
    country_code
  }
}
`;

export const updateCountry: DocumentNode = gql`
mutation updateCountry($country_id: ID!, $country_name: String, $country_code: String) {
    updateCountry(country_id: $country_id, country_name: $country_name, country_code: $country_code) {
      country_id
      country_name
      country_code
    }
}
`;

export const destroyCountry: DocumentNode = gql`
mutation destroyCountry($country_id: ID!) {
  destroyCountry(country_id: $country_id) {
    country_id
    country_name
    country_code
  }
}
`;
