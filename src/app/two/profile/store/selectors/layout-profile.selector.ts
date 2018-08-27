import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-profile.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProfileState,
  (state: fromFeature.ProfileState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

