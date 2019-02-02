import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/e/context-var/store/reducers/entity-context-var.reducer';
import * as fromSearch from '@web/app/features/e/context-var/store/reducers/search-context-var.reducer';
import * as fromPagination from '@web/app/features/e/context-var/store/reducers/pagination-context-var.reducer';
import * as fromLayout from '@web/app/features/e/context-var/store/reducers/layout-context-var.reducer';
import * as fromCore from '@web/app/core/store';

export interface ContextVarState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  context_var: ContextVarState;
}

export const reducers: ActionReducerMap<ContextVarState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getContextVarState = createFeatureSelector<State, ContextVarState>('context_var');
