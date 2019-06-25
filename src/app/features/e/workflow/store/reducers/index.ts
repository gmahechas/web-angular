import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

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

export interface State extends fromCore.State {
  workflow: WorkflowState;
}

export function reducers(state: WorkflowState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getWorkflowState = createFeatureSelector<State, WorkflowState>('workflow');
