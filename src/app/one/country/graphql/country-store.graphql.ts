import { Injectable } from '@angular/core';

import { StoreCountry } from '@app/app/one/country/models/store-country.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CountryStoreGQL extends Mutation<StoreCountry> {

  document: DocumentNode = gql`
    mutation storeCountry($country_name: String, $country_code: String) {
      storeCountry(country_name: $country_name, country_code: $country_code) {
        country_id
        country_name
        country_code
      }
    }
  `;

}
