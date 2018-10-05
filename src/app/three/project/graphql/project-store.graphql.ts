import { Injectable } from '@angular/core';

import { StoreProject } from '@web/app/three/project/models/store-project.model';

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
      project_created_at
      project_updated_at
      project_deleted_at
      macroproject_id
      macroproject {
        macroproject_id
        macroproject_name
        macroproject_address
        macroproject_phone
        macroproject_created_at
        macroproject_updated_at
        macroproject_deleted_at
        city_id
        office_id
      }
    }
  }
`;

}
