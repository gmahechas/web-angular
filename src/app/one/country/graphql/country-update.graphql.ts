import { Injectable } from '@angular/core';

import { UpdateCountry } from '@web/app/one/country/models/update-country.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CountryUpdateGQL extends Mutation<UpdateCountry> {

  document: DocumentNode = gql`
    mutation updateCountry($country_id: ID!, $country_name: String, $country_code: String) {
      updateCountry(country_id: $country_id, country_name: $country_name, country_code: $country_code) {
        country_id
        country_name
        country_code
      }
    }
  `;

}
