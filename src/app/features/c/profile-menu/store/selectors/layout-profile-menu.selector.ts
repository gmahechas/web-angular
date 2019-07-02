import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/profile-menu/store/reducers';
import * as fromLayout from '@web/app/features/c/profile-menu/store/reducers/layout-profile-menu.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProfileMenuState,
  (state: fromFeature.ProfileMenuState) => state.layout
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
