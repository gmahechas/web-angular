import { Injectable } from '@angular/core';

import { StoreOffice } from '@web/app/features/b/office/models/store-office.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeStoreGQL extends Mutation<StoreOffice> {

document: DocumentNode = gql`
  mutation storeOffice($office_name: String, $city_id: ID) {
    storeOffice(office_name: $office_name, company_id: 1, city_id: $city_id) {
      office_id
      office_name
      city_id,
      city {
        city_id
        city_name
        city_code
      }
    }
  }
`;

}
