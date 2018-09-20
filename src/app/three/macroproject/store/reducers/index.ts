import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity-macroproject.reducer';
import * as fromSearch from './search-macroproject.reducer';
import * as fromPagination from './pagination-macroproject.reducer';
import * as fromLayout from './layout-macroproject.reducer';
import * as fromCore from '../../../../core/store';

export interface MacroprojectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<MacroprojectState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  macroproject: MacroprojectState;
}

export const getMacroprojectState = createFeatureSelector<State, MacroprojectState>('macroproject');
