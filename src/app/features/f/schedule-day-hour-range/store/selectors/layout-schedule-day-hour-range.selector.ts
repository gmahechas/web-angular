import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule-day-hour-range/store/reducers';
import * as fromLayout from '@web/app/features/f/schedule-day-hour-range/store/reducers/layout-schedule-day-hour-range.reducer';

export const getLayoutState = createSelector(
  fromFeature.getScheduleDayHourRangeState,
  (state: fromFeature.ScheduleDayHourRangeState) => state.layout
);

export const getSelected = createSelector(
  getLayoutState,
  fromLayout.getSelected
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
