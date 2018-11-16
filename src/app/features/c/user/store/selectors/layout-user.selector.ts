import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/user/store/reducers';
import * as fromLayout from '@web/app/features/c/user/store/reducers/layout-user.reducer';

export const getLayoutState = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
