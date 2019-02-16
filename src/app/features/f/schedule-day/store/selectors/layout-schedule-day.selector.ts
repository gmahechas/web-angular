import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule-day/store/reducers';
import * as fromLayout from '@web/app/features/f/schedule-day/store/reducers/layout-schedule-day.reducer';

export const getLayoutState = createSelector(
  fromFeature.getScheduleDayState,
  (state: fromFeature.ScheduleDayState) => state.layout
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
