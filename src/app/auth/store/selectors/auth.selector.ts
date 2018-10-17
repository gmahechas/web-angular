import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/auth/store/reducers';
import * as fromAuth from '@web/app/auth/store/reducers/auth.reducer';

export const getStatusState = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.status
);

export const getToken = createSelector(
  getStatusState,
  fromAuth.getToken
);

export const getUser = createSelector(
  getStatusState,
  fromAuth.getUser
);

export const getCompany = createSelector(
  getStatusState,
  fromAuth.getCompany
);

export const getLoggedIn = createSelector(
  getUser,
  user => !!user
);
