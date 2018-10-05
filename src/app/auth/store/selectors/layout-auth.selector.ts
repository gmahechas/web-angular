import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/auth/store/reducers';
import * as fromLayout from '@app/app/auth/store/reducers/layout-auth.reducer';

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
