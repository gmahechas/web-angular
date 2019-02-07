import { Injectable } from '@angular/core';

import { QueryRef } from 'apollo-angular';
import * as fromGraphql from '@web/app/features/e/workflow/graphql';

import * as fromModels from '@web/app/features/e/workflow/models';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  queryRef: QueryRef<fromModels.PaginationWorkflow>;

  constructor(
    private workflowPaginationGQL: fromGraphql.WorkflowPaginationGQL,
    private workflowStoreGQL: fromGraphql.WorkflowStoreGQL,
    private workflowUpdateGQL: fromGraphql.WorkflowUpdateGQL,
    private workflowDestroyGQL: fromGraphql.WorkflowDestroyGQL
  ) { }

  load(searchWorkflow: fromModels.SearchWorkflow) {
    this.queryRef = this.workflowPaginationGQL.watch({
      ...searchWorkflow.workflow,
      limit: searchWorkflow.limit,
      page: searchWorkflow.page
    });

    return this.queryRef.valueChanges;
  }

  store(workflow: fromModels.Workflow) {
    return this.workflowStoreGQL.mutate(workflow);
  }

  update(workflow: fromModels.Workflow) {
    return this.workflowUpdateGQL.mutate(workflow);
  }

  destroy(workflow: fromModels.Workflow) {
    return this.workflowDestroyGQL.mutate(workflow);
  }

  pagination(searchWorkflow: fromModels.SearchWorkflow) {

    return this.queryRef.fetchMore({
      query: this.workflowPaginationGQL.document,
      variables: {
        workflow_id: searchWorkflow.workflow.workflow_id,
        workflow_name: searchWorkflow.workflow.workflow_name,
        limit: searchWorkflow.limit,
        page: searchWorkflow.page
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, [prev, fetchMoreResult]);
      }
    });
  }

}
