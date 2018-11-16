import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/profile/store/reducers';
import * as fromLayout from '@web/app/features/c/profile/store/reducers/layout-profile.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProfileState,
  (state: fromFeature.ProfileState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
