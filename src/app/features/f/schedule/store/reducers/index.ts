import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

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

export const reducers: ActionReducerMap<ScheduleState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  schedule: ScheduleState;
}

export const getScheduleState = createFeatureSelector<State, ScheduleState>('schedule');
