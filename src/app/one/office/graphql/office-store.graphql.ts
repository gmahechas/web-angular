import { Injectable } from '@angular/core';

import { StoreOffice } from '@app/app/one/office/models/store-office.model';

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
      office_created_at
      office_updated_at
      office_deleted_at
      city_id,
      city {
        city_id
        city_name
        city_code
        city_created_at
        city_updated_at
        city_deleted_at
      }
    }
  }
`;

}
