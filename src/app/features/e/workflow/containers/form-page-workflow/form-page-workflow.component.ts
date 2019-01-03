import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';

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
    this.store.dispatch(new fromWorkflow.StoreEntity({ entity: workflow }));
  }

  onUpdate(workflow: Workflow) {
    this.store.dispatch(new fromWorkflow.UpdateEntity({ entity: workflow }));
  }

  onCancel() {
    this.store.dispatch(new fromWorkflow.SelectEntity({ entity: null }));
    this.store.dispatch(new fromCore.Go({
      path: ['workflow']
    }));
  }

  onDestroy(workflow: Workflow) {
    this.store.dispatch(new fromWorkflow.DestroyEntity({ entity: workflow }));
  }
}
