import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-user.reducer';

export const getLayoutState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

