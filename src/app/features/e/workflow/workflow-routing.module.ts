import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/e/workflow/containers';
import { WorkflowExistGuard } from '@web/app/features/e/workflow/guards/workflow-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageWorkflowComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageWorkflowComponent },
      { path: ':workflow_id', component: fromContainers.FormPageWorkflowComponent, canActivate: [WorkflowExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRoutingModule { }
