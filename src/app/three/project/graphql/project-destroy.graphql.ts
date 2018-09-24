import { Injectable } from '@angular/core';

import { DestroyProject } from '../models/destroy-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProjectDestroyGQL extends Mutation<DestroyProject> {

document: DocumentNode = gql`
  mutation destroyProject($project_id: ID!) {
    destroyProject(project_id: $project_id) {
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
