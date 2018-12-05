import { Injectable } from '@angular/core';

import { DestroyCountry } from '@web/app/features/a/country/models/destroy-country.model';

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
      }
    }
  `;

}
