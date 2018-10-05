import { Injectable } from '@angular/core';

import { StoreEstate } from '@app/app/one/estate/models/store-estate.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EstateStoreGQL extends Mutation<StoreEstate> {

  document: DocumentNode = gql`
    mutation storeEstate($estate_name: String, $estate_code: String, $country_id: ID!) {
      storeEstate(estate_name: $estate_name, estate_code: $estate_code, country_id: $country_id) {
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
  `;

}
