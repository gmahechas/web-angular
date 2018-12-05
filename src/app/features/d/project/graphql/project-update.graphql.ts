import { Injectable } from '@angular/core';

import { UpdateProject } from '@web/app/features/d/project/models/update-project.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ProjectUpdateGQL extends Mutation<UpdateProject> {

document: DocumentNode = gql`
  mutation updateProject(
    $project_id: ID!,
    $project_name: String,
    $project_address: String,
    $project_phone: String,
    $macroproject_id: ID
  ) {
      updateProject(
        project_id: $project_id,
        project_name: $project_name,
        project_address: $project_address,
        project_phone: $project_phone,
        macroproject_id: $macroproject_id
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
        }
      }
  }
`;

}
