import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const pagination: DocumentNode = gql`
query paginationPerson(
  $person_id: ID,
  $person_identification: String,
  $person_names: String,
  $limit: Int,
  $page: Int
) {
  paginationPerson(
    person_id: $person_id,
    person_identification: $person_identification,
    person_names: $person_names,
    limit: $limit,
    page: $page
  ) {
    total
    per_page
    current_page
    from
    to
    data {
      person_id
      person_business_type
      person_identification_type
      person_identification
      person_first_name
      person_second_name
      person_first_surname
      person_second_surname
      person_legal_name
      person_created_at
      person_updated_at
      person_deleted_at
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
mutation storePerson(
  $person_business_type: String,
  $person_identification_type: String,
  $person_identification: String,
  $person_first_name: String,
  $person_second_name: String,
  $person_first_surname: String,
  $person_second_surname: String,
  $person_legal_name: String,
  $city_id: ID!
) {
  storePerson(
    person_business_type: $person_business_type,
    person_identification_type: $person_identification_type,
    person_identification: $person_identification,
    person_first_name: $person_first_name,
    person_second_name: $person_second_name,
    person_first_surname: $person_first_surname,
    person_second_surname: $person_second_surname,
    person_legal_name: $person_legal_name,
    city_id: $city_id
  ) {
    person_id
    person_business_type
    person_identification_type
    person_identification
    person_first_name
    person_second_name
    person_first_surname
    person_second_surname
    person_legal_name
    person_created_at
    person_updated_at
    person_deleted_at
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

export const update: DocumentNode = gql`
mutation updatePerson(
  $person_id: ID!,
  $person_business_type: String,
  $person_identification_type: String,
  $person_identification: String,
  $person_first_name: String,
  $person_second_name: String,
  $person_first_surname: String,
  $person_second_surname: String,
  $person_legal_name: String,
  $city_id: ID
) {
    updatePerson(
      person_id: $person_id,
      person_business_type: $person_business_type,
      person_identification_type: $person_identification_type,
      person_identification: $person_identification,
      person_first_name: $person_first_name,
      person_second_name: $person_second_name,
      person_first_surname: $person_first_surname,
      person_second_surname: $person_second_surname,
      person_legal_name: $person_legal_name,
      city_id: $city_id
    ) {
      person_id
      person_business_type
      person_identification_type
      person_identification
      person_first_name
      person_second_name
      person_first_surname
      person_second_surname
      person_legal_name
      person_created_at
      person_updated_at
      person_deleted_at
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
mutation destroyPerson($person_id: ID!) {
  destroyPerson(person_id: $person_id) {
    person_id
    person_business_type
    person_identification_type
    person_identification
    person_first_name
    person_second_name
    person_first_surname
    person_second_surname
    person_legal_name
    person_created_at
    person_updated_at
    person_deleted_at
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
