import { Injectable } from '@angular/core';

import { StoreWorkflow } from '@web/app/features/e/workflow/models/store-workflow.model';

import { Mutation } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WorkflowStoreGQL extends Mutation<StoreWorkflow> {

  document: DocumentNode = gql`
    mutation storeWorkflow($workflow_name: String, $workflow_description: String) {
      storeWorkflow(workflow_name: $workflow_name, workflow_description: $workflow_description) {
        workflow_id
        workflow_name
        workflow_description
      }
    }
  `;

}
