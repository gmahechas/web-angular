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
    mutation updateWorkflow($workflow_id: ID!, $workflow_name: String, $workflow_description: String) {
        updateWorkflow(workflow_id: $workflow_id, workflow_name: $workflow_name, workflow_description: $workflow_description) {
          workflow_id
          workflow_name
          workflow_description
          workflow_created_at
          workflow_updated_at
          workflow_deleted_at
        }
    }
  `;

}
