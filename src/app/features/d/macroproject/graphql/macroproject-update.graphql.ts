import { Injectable } from '@angular/core';

import { UpdateMacroproject } from '@web/app/features/d/macroproject/models/update-macroproject.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class MacroprojectUpdateGQL extends Mutation<UpdateMacroproject> {

document: DocumentNode = gql`
  mutation updateMacroproject(
      $macroproject_id: ID!
      $macroproject_name: String,
      $macroproject_address: String,
      $macroproject_phone: String,
      $city_id: ID,
      $office_id: ID
    ) {
      updateMacroproject(
        macroproject_id: $macroproject_id,
        macroproject_name: $macroproject_name,
        macroproject_address: $macroproject_address,
        macroproject_phone: $macroproject_phone,
        city_id: $city_id,
        office_id: $office_id
      ) {
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
