import { Injectable } from '@angular/core';

import { PaginationWorkflow } from '@web/app/features/e/workflow/models/pagination-workflow.model';

import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class WorkflowPaginationGQL extends Query<PaginationWorkflow> {

  document: DocumentNode = gql`
    query paginationWorkflow(
      $workflow_id: ID,
      $workflow_name: String,
      $limit: Int,
      $page: Int
    ) {
      paginationWorkflow(
        workflow_id: $workflow_id,
        workflow_name: $workflow_name,
        limit: $limit,
        page: $page
      ) {
        total
        per_page
        current_page
        from
        to
        data {
          workflow_id
          workflow_name
          workflow_description
          workflow_created_at
          workflow_updated_at
          workflow_deleted_at
        }
      }
    }
  `;
}
