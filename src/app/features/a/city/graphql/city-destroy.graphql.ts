import { Injectable } from '@angular/core';

import { DestroyCity } from '@web/app/features/a/city/models/destroy-city.model';

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
      estate_id
    }
  }
`;

}
