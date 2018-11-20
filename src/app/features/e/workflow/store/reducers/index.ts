import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/e/workflow/store/reducers/entity-workflow.reducer';
import * as fromSearch from '@web/app/features/e/workflow/store/reducers/search-workflow.reducer';
import * as fromPagination from '@web/app/features/e/workflow/store/reducers/pagination-workflow.reducer';
import * as fromLayout from '@web/app/features/e/workflow/store/reducers/layout-workflow.reducer';
import * as fromCore from '@web/app/core/store';

export interface WorkflowState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<WorkflowState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  workflow: WorkflowState;
}

export const getWorkflowState = createFeatureSelector<State, WorkflowState>('workflow');
