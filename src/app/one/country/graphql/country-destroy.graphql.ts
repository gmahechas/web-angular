import { Injectable } from '@angular/core';

import { DestroyCountry } from '../models';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CountryDestroyGQL extends Mutation<DestroyCountry> {

  document: DocumentNode = gql`
    mutation destroyCountry($country_id: ID!) {
      destroyCountry(country_id: $country_id) {
        country_id
        country_name
        country_code
        country_created_at
        country_updated_at
        country_deleted_at
      }
    }
  `;

}
