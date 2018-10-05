import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/profile/store/reducers';
import * as fromLayout from '@app/app/two/profile/store/reducers/layout-profile.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProfileState,
  (state: fromFeature.ProfileState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

