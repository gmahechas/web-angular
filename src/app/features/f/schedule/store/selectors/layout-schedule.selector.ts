import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule/store/reducers';
import * as fromLayout from '@web/app/features/f/schedule/store/reducers/layout-schedule.reducer';

export const getLayoutState = createSelector(
  fromFeature.getScheduleState,
  (state: fromFeature.ScheduleState) => state.layout
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
