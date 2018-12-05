import { Injectable } from '@angular/core';

import { DestroyMacroproject } from '@web/app/features/d/macroproject/models/destroy-macroproject.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class MacroprojectDestroyGQL extends Mutation<DestroyMacroproject> {

document: DocumentNode = gql`
  mutation destroyMacroproject($macroproject_id: ID!) {
    destroyMacroproject(macroproject_id: $macroproject_id) {
      macroproject_id
      macroproject_name
      macroproject_address
      macroproject_phone
      city_id
      city {
        city_id
        city_name
        city_code
      }
      office_id
      office {
        office_id
        office_name
      }
    }
  }
`;

}
