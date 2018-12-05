import { Injectable } from '@angular/core';

import { UpdateCity } from '@web/app/features/a/city/models/update-city.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CityUpdateGQL extends Mutation<UpdateCity> {

document: DocumentNode = gql`
  mutation updateCity($city_id: ID!, $city_name: String, $city_code: String, $estate_id: ID) {
      updateCity(city_id: $city_id, city_name: $city_name, city_code: $city_code, estate_id: $estate_id) {
        city_id
        city_name
        city_code
        estate_id
        estate {
          estate_id
          estate_name
          estate_code
          country_id
          country {
            country_id
            country_name
            country_code
          }
        }
      }
  }
`;

}
