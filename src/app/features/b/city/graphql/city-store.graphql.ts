import { Injectable } from '@angular/core';

import { StoreCity } from '@web/app/features/b/city/models/store-city.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CityStoreGQL extends Mutation<StoreCity> {

document: DocumentNode = gql`
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

}
