import { Injectable } from '@angular/core';

import { DestroyProject } from '@web/app/features/d/project/models/destroy-project.model';

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
