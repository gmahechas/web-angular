import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
query paginationCity(
  $city_id: ID,
  $city_name: String,
  $city_code: String,
  $estate_id: ID,
  $limit: Int,
  $page: Int
) {
  paginationCity(
    city_id: $city_id,
    city_name: $city_name,
    city_code: $city_code,
    estate_id: $estate_id,
    limit: $limit,
    page: $page
  ) {
    total
    per_page
    current_page
    from
    to
    data {
      city_id
      city_name
      city_code
      city_created_at
      city_updated_at
      city_deleted_at
      estate_id
      estate {
        estate_id
        estate_name
        estate_code
        estate_created_at
        estate_updated_at
        estate_deleted_at
        country_id
        country {
          country_id
          country_name
          country_code
          country_created_at
          country_updated_at
          country_deleted_at
        }
      }
    }
  }
}
`;

export const store: DocumentNode = gql`
mutation storeCity($city_name: String, $city_code: String, $estate_id: ID!) {
  storeCity(city_name: $city_name, city_code: $city_code, estate_id: $estate_id) {
    city_id
    city_name
    city_code
    city_created_at
    city_updated_at
    city_deleted_at
    estate_id
    estate {
      estate_id
      estate_name
      estate_code
      estate_created_at
      estate_updated_at
      estate_deleted_at
      country_id
      country {
        country_id
        country_name
        country_code
        country_created_at
        country_updated_at
        country_deleted_at
      }
    }
  }
}
`;

export const update: DocumentNode = gql`
mutation updateCity($city_id: ID!, $city_name: String, $city_code: String, $estate_id: ID) {
    updateCity(city_id: $city_id, city_name: $city_name, city_code: $city_code, estate_id: $estate_id) {
      city_id
      city_name
      city_code
      city_created_at
      city_updated_at
      city_deleted_at
      estate_id
      estate {
        estate_id
        estate_name
        estate_code
        estate_created_at
        estate_updated_at
        estate_deleted_at
        country_id
        country {
          country_id
          country_name
          country_code
          country_created_at
          country_updated_at
          country_deleted_at
        }
      }
    }
}
`;

export const destroy: DocumentNode = gql`
mutation destroyCity($city_id: ID!) {
  destroyCity(city_id: $city_id) {
    city_id
    city_name
    city_code
    city_created_at
    city_updated_at
    city_deleted_at
    estate_id
  }
}
`;
