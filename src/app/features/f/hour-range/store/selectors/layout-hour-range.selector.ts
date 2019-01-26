import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/hour-range/store/reducers';
import * as fromLayout from '@web/app/features/f/hour-range/store/reducers/layout-hour-range.reducer';

export const getLayoutState = createSelector(
  fromFeature.getHourRangeState,
  (state: fromFeature.HourRangeState) => state.layout
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
