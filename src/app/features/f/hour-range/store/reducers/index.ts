import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

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

export const reducers: ActionReducerMap<HourRangeState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  hour_range: HourRangeState;
}

export const getHourRangeState = createFeatureSelector<State, HourRangeState>('hour_range');
