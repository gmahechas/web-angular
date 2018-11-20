import { Injectable } from '@angular/core';

import * as fromGraphql from '@web/app/features/e/workflow/graphql';

import * as fromModels from '@web/app/features/e/workflow/models';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(
    private workflowPagination: fromGraphql.WorkflowPaginationGQL,
    private workflowStoreGQL: fromGraphql.WorkflowStoreGQL,
    private workflowUpdateGQL: fromGraphql.WorkflowUpdateGQL,
    private workflowDestroyGQL: fromGraphql.WorkflowDestroyGQL
  ) { }

  load(searchWorkflow: fromModels.SearchWorkflow) {
    return this.workflowPagination.watch({
      ...searchWorkflow.workflow,
      limit: searchWorkflow.limit,
      page: searchWorkflow.page
    }).valueChanges;
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
    return this.workflowPagination.fetch({
      workflow_id: searchWorkflow.workflow.workflow_id,
      workflow_name: searchWorkflow.workflow.workflow_name,
      limit: searchWorkflow.limit,
      page: searchWorkflow.page
    });
  }

}
