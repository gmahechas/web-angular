import { Injectable } from '@angular/core';

import { DestroyEstate } from '@web/app/features/b/estate/models/destroy-estate.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EstateDestroyGQL extends Mutation<DestroyEstate> {

  document: DocumentNode = gql`
    mutation destroyEstate($estate_id: ID!) {
      destroyEstate(estate_id: $estate_id) {
        estate_id
        estate_name
        estate_code
        estate_created_at
        estate_updated_at
        estate_deleted_at
        country_id
      }
    }
  `;

}
