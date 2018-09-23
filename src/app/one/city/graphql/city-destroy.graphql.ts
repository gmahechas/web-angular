import { Injectable } from '@angular/core';

import { DestroyCity } from '../models/destroy-city.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CityDestroyGQL extends Mutation<DestroyCity> {

document: DocumentNode = gql`
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

}
