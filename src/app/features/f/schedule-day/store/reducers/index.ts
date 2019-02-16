import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/f/schedule-day/store/reducers/entity-schedule-day.reducer';
import * as fromSearch from '@web/app/features/f/schedule-day/store/reducers/search-schedule-day.reducer';
import * as fromPagination from '@web/app/features/f/schedule-day/store/reducers/pagination-schedule-day.reducer';
import * as fromLayout from '@web/app/features/f/schedule-day/store/reducers/layout-schedule-day.reducer';
import * as fromCore from '@web/app/core/store';

export interface ScheduleDayState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  schedule_day: ScheduleDayState;
}

export const reducers: ActionReducerMap<ScheduleDayState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getScheduleDayState = createFeatureSelector<State, ScheduleDayState>('schedule_day');
