import { Injectable } from '@angular/core';

import { StoreProject } from '@web/app/features/d/project/models/store-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreGQL extends Mutation<StoreProject> {

document: DocumentNode = gql`
  mutation storeProject(
    $project_name: String,
    $project_address: String,
    $project_phone: String,
    $macroproject_id: ID
  ) {
    storeProject(
      project_name: $project_name,
      project_address: $project_address,
      project_phone: $project_phone,
      macroproject_id: $macroproject_id,
    ) {
      project_id
      project_name
      project_address
      project_phone
      macroproject_id
      macroproject {
        macroproject_id
        macroproject_name
        macroproject_address
        macroproject_phone
        city_id
        office_id
        office {
          office_id
          office_name
          company_id
          city_id
        }
      }
    }
  }
`;

}
