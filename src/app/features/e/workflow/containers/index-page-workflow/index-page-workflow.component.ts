import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-workflow',
  templateUrl: './index-page-workflow.component.html',
  styles: []
})
export class IndexPageWorkflowComponent implements OnInit {

  query$ = this.store.pipe(select(fromStore.getQuery, take(1)));

  data$ = this.store.pipe(select(fromStore.getAllEntities));
  total$ = this.store.pipe(select(fromStore.getTotal));
  perPage$ = this.store.pipe(select(fromStore.getPerPage));
  from$ = this.store.pipe(select(fromStore.getFrom));
  to$ = this.store.pipe(select(fromStore.getTo));
  configTable: any;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.configTable = {
      dataKey: 'workflow_id',
      cols: [
        { fields: ['workflow_id'], header: ['workflow.model.workflow_id'], style: { 'width': '10%' } },
        { fields: ['workflow_name'], header: ['workflow.model.workflow_name'], style: { 'width': '20%' } },
        { fields: ['workflow_description'], header: ['workflow.model.workflow_description'], style: { 'width': '70%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() { }

  onLoad(workflowSearch: SearchWorkflow) {
    this.store.dispatch(new fromStore.LoadEntity({
      search: {
        workflow: workflowSearch.workflow,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', 'create']
    }));
  }

  onEdit(workflow: Workflow) {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', workflow.workflow_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromStore.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromCore.Go({
      path: ['workflow']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromStore.ResetSearch());
  }
}
