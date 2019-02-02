import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/e/context/store/reducers/entity-context.reducer';
import * as fromSearch from '@web/app/features/e/context/store/reducers/search-context.reducer';
import * as fromPagination from '@web/app/features/e/context/store/reducers/pagination-context.reducer';
import * as fromLayout from '@web/app/features/e/context/store/reducers/layout-context.reducer';
import * as fromCore from '@web/app/core/store';

export interface ContextState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  context: ContextState;
}

export const reducers: ActionReducerMap<ContextState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getContextState = createFeatureSelector<State, ContextState>('context');
