import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
query paginationOffice(
  $office_id: ID,
  $office_name: String,
  $city_id: ID,
  $limit: Int,
  $page: Int
) {
  paginationOffice(
    office_id: $office_id,
    office_name: $office_name,
    city_id: $city_id,
    limit: $limit,
    page: $page
  ) {
    total
    per_page
    current_page
    from
    to
    data {
      office_id
      office_name
      office_created_at
      office_updated_at
      office_deleted_at
      company_id
      city_id
      city {
        city_id
        city_name
        city_code
        city_created_at
        city_updated_at
        city_deleted_at
      }
    }
  }
}
`;

export const store: DocumentNode = gql`
mutation storeOffice($office_name: String, $city_id: ID) {
  storeOffice(office_name: $office_name, company_id: 1, city_id: $city_id) {
    office_id
    office_name
    office_created_at
    office_updated_at
    office_deleted_at
    city_id,
    city {
      city_id
      city_name
      city_code
      city_created_at
      city_updated_at
      city_deleted_at
    }
  }
}
`;

export const update: DocumentNode = gql`
mutation updateOffice($office_id: ID!, $office_name: String, $city_id: ID) {
    updateOffice(office_id: $office_id, office_name: $office_name, city_id: $city_id) {
      office_id
      office_name
      office_created_at
      office_updated_at
      office_deleted_at
      city_id
      city {
        city_id
        city_name
        city_code
        city_created_at
        city_updated_at
        city_deleted_at
      }
    }
}
`;

export const destroy: DocumentNode = gql`
mutation destroyOffice($office_id: ID!) {
  destroyOffice(office_id: $office_id) {
    office_id
    office_name
    office_created_at
    office_updated_at
    office_deleted_at
    city_id
  }
}
`;
