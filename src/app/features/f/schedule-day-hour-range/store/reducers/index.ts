import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/features/f/schedule-day-hour-range/store/reducers/entity-schedule-day-hour-range.reducer';
import * as fromSearch from '@web/app/features/f/schedule-day-hour-range/store/reducers/search-schedule-day-hour-range.reducer';
import * as fromPagination from '@web/app/features/f/schedule-day-hour-range/store/reducers/pagination-schedule-day-hour-range.reducer';
import * as fromLayout from '@web/app/features/f/schedule-day-hour-range/store/reducers/layout-schedule-day-hour-range.reducer';
import * as fromCore from '@web/app/core/store';

export interface ScheduleDayHourRangeState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export interface State extends fromCore.State {
  schedule_day_hour_range: ScheduleDayHourRangeState;
}

export const reducers: ActionReducerMap<ScheduleDayHourRangeState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export const getScheduleDayHourRangeState = createFeatureSelector<State, ScheduleDayHourRangeState>('schedule_day_hour_range');
