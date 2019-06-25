import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/d/macroproject/store/reducers/entity-macroproject.reducer';
import * as fromSearch from '@web/app/features/d/macroproject/store/reducers/search-macroproject.reducer';
import * as fromPagination from '@web/app/features/d/macroproject/store/reducers/pagination-macroproject.reducer';
import * as fromLayout from '@web/app/features/d/macroproject/store/reducers/layout-macroproject.reducer';
import * as fromCore from '@web/app/core/store';

export interface MacroprojectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  macroproject: MacroprojectState;
}

export function reducers(state: MacroprojectState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getMacroprojectState = createFeatureSelector<State, MacroprojectState>('macroproject');
