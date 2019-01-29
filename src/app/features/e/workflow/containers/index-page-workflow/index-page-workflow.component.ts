import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import * as fromWorkflow from '@web/app/features/e/workflow/store';
import * as fromCore from '@web/app/core/store';

import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';
import { SelectedWorkflow, initialStateSelectedWorkflow } from '@web/app/features/e/workflow/models/selected-workflow.model';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-index-page-workflow',
  templateUrl: './index-page-workflow.component.html',
  styles: []
})
export class IndexPageWorkflowComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  selectedEntity: Workflow;

  query$ = this.store.pipe(select(fromWorkflow.getQuery));

  data$ = this.store.pipe(select(fromWorkflow.getAllEntities));
  total$ = this.store.pipe(select(fromWorkflow.getTotal));
  perPage$ = this.store.pipe(select(fromWorkflow.getPerPage));
  from$ = this.store.pipe(select(fromWorkflow.getFrom));
  to$ = this.store.pipe(select(fromWorkflow.getTo));
  configTable: any;

  constructor(
    private store: Store<fromWorkflow.State>
  ) {
    this.configTable = {
      dataKey: 'workflow_id',
      cols: [
        { fields: ['workflow_id'], header: ['workflow.model.workflow_id'], style: { width: '5%' } },
        { fields: ['workflow_name'], header: ['workflow.model.workflow_name'], style: { width: '25%' } },
        { fields: ['workflow_description'], header: ['workflow.model.workflow_description'], style: { width: '70%' } },
      ],
      selectionMode: 'single'
    };
  }

  ngOnInit() {
    this.subscription = this.store.pipe(select(fromWorkflow.getSelected), take(1)).subscribe(
      (selected: SelectedWorkflow) => {
        if (selected.selectedEntity) {
          this.selectedEntity = selected.selectedEntity;
          this.store.dispatch(new fromCore.Go({
            path: ['workflow', selected.selectedEntity.workflow_id]
          }));
        }
      }
    );
  }

  onLoad(workflowSearch: SearchWorkflow) {
    this.store.dispatch(new fromWorkflow.LoadEntity({
      search: {
        workflow: workflowSearch.workflow,
        limit: 20,
        page: 1
      }
    }));
  }

  onCreate() {
    this.store.dispatch(new fromWorkflow.SetSelected({ selected: initialStateSelectedWorkflow }));
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', 'create']
    }));
  }

  onEdit(workflow: Workflow) {
    this.store.dispatch(new fromWorkflow.SetSelected({ selected: { ...initialStateSelectedWorkflow, selectedEntity: workflow } }));
    this.store.dispatch(new fromCore.Go({
      path: ['workflow', workflow.workflow_id]
    }));
  }

  onPaginate(event) {
    this.store.dispatch(new fromWorkflow.PaginateEntity({ page: event.page + 1 }));
  }

  onCancel() {
    this.store.dispatch(new fromWorkflow.SetSelected({ selected: initialStateSelectedWorkflow }));
    this.store.dispatch(new fromCore.Go({
      path: ['workflow']
    }));
  }

  onResetSearch() {
    this.store.dispatch(new fromWorkflow.Reset());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
