import { Injectable } from '@angular/core';

import { UpdateWorkflow } from '@web/app/features/e/workflow/models/update-workflow.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WorkflowUpdateGQL extends Mutation<UpdateWorkflow> {

  document: DocumentNode = gql`
    mutation updateWorkflow(
      $workflow_id: ID!,
      $workflow_name: String,
      $workflow_description: String,
      $workflow_first_activities: String,
      $workflow_edit_activities: String,
      $workflow_latest_activities: String
    ) {
        updateWorkflow(
          workflow_id: $workflow_id,
          workflow_name: $workflow_name,
          workflow_description: $workflow_description,
          workflow_first_activities: $workflow_first_activities,
          workflow_edit_activities: $workflow_edit_activities,
          workflow_latest_activities: $workflow_latest_activities
        ) {
          workflow_id
          workflow_name
          workflow_description
        }
    }
  `;

}
