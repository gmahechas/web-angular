import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-office.reducer';

export const getLayoutState = createSelector(
  fromFeature.getOfficeState,
  (state: fromFeature.OfficeState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

