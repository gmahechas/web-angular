import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/f/hour-range/store/reducers/entity-hour-range.reducer';
import * as fromSearch from '@web/app/features/f/hour-range/store/reducers/search-hour-range.reducer';
import * as fromPagination from '@web/app/features/f/hour-range/store/reducers/pagination-hour-range.reducer';
import * as fromLayout from '@web/app/features/f/hour-range/store/reducers/layout-hour-range.reducer';
import * as fromCore from '@web/app/core/store';

export interface HourRangeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  hour_range: HourRangeState;
}

export function reducers(state: HourRangeState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer
  })(state, action);
}

export const getHourRangeState = createFeatureSelector<State, HourRangeState>('hour_range');
