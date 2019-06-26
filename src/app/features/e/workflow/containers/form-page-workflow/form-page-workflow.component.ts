import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { initialStateSelectedWorkflow } from '@web/app/features/e/workflow/models/selected-workflow.model';

@Component({
  selector: 'app-form-page-workflow',
  templateUrl: './form-page-workflow.component.html',
  styles: []
})
export class FormPageWorkflowComponent implements OnInit {

  pending$ = this.store.pipe(select(fromWorkflow.getPending));
  workflow$ = this.store.pipe(select(fromWorkflow.getSelectedByRouter));

  constructor(
    private store: Store<fromWorkflow.State>
  ) { }

  ngOnInit() {
  }

  onStore(workflow: Workflow) {
    this.store.dispatch(fromWorkflow.EntityActions.StoreEntity({ entity: workflow }));
  }

  onUpdate(workflow: Workflow) {
    this.store.dispatch(fromWorkflow.EntityActions.UpdateEntity({ entity: workflow }));
  }

  onCancel() {
    this.store.dispatch(fromWorkflow.EntityActions.SetSelected({ selected: initialStateSelectedWorkflow }));
    this.store.dispatch(fromCore.RouterActions.Go({
      path: ['workflow']
    }));
  }

  onDestroy(workflow: Workflow) {
    this.store.dispatch(fromWorkflow.EntityActions.DestroyEntity({ entity: workflow }));
  }
}
