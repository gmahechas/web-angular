import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/f/day/store/reducers/entity-day.reducer';
import * as fromSearch from '@web/app/features/f/day/store/reducers/search-day.reducer';
import * as fromPagination from '@web/app/features/f/day/store/reducers/pagination-day.reducer';
import * as fromLayout from '@web/app/features/f/day/store/reducers/layout-day.reducer';
import * as fromCore from '@web/app/core/store';

export interface DayState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  day: DayState;
}

export function reducers(state: DayState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getDayState = createFeatureSelector<State, DayState>('day');
