import { Injectable } from '@angular/core';

import { UpdateOffice } from '@web/app/features/b/office/models/update-office.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeUpdateGQL extends Mutation<UpdateOffice> {

document: DocumentNode = gql`
  mutation updateOffice($office_id: ID!, $office_name: String, $city_id: ID) {
      updateOffice(office_id: $office_id, office_name: $office_name, city_id: $city_id) {
        office_id
        office_name
        city_id
        city {
          city_id
          city_name
          city_code
        }
      }
  }
`;

}
