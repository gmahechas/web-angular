import { Injectable } from '@angular/core';

import { DestroyWorkflow } from '@web/app/features/e/workflow/models/destroy-workflow.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WorkflowDestroyGQL extends Mutation<DestroyWorkflow> {

  document: DocumentNode = gql`
    mutation destroyWorkflow($workflow_id: ID!) {
      destroyWorkflow(workflow_id: $workflow_id) {
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
