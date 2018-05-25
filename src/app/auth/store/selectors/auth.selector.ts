import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const getStatusState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.status
);

export const getLoggedIn = createSelector(
  getStatusState,
  fromAuth.getLoggedIn
);
