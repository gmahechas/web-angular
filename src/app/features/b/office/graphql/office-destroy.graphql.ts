import { Injectable } from '@angular/core';

import { DestroyOffice } from '@web/app/features/b/office/models/destroy-office.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class OfficeDestroyGQL extends Mutation<DestroyOffice> {

document: DocumentNode = gql`
  mutation destroyOffice($office_id: ID!) {
    destroyOffice(office_id: $office_id) {
      office_id
      office_name
      city_id
    }
  }
`;

}
