import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromEntity from '@web/app/features/f/schedule/store/reducers/entity-schedule.reducer';
import * as fromSearch from '@web/app/features/f/schedule/store/reducers/search-schedule.reducer';
import * as fromPagination from '@web/app/features/f/schedule/store/reducers/pagination-schedule.reducer';
import * as fromLayout from '@web/app/features/f/schedule/store/reducers/layout-schedule.reducer';
import * as fromCore from '@web/app/core/store';

export interface ScheduleState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  schedule: ScheduleState;
}

export function reducers(state: ScheduleState | undefined, action: Action) {
  return combineReducers({
    entity: fromEntity.reducer,
    search: fromSearch.reducer,
    pagination: fromPagination.reducer,
    layout: fromLayout.reducer,
  })(state, action);
}

export const getScheduleState = createFeatureSelector<State, ScheduleState>('schedule');
