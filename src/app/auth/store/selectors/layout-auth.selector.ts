import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-auth.reducer';

export const getLayoutState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
