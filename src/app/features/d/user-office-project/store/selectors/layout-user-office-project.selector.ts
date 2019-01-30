import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/d/user-office-project/store/reducers';
import * as fromLayout from '@web/app/features/d/user-office-project/store/reducers/layout-user-office-project.reducer';

export const getLayoutState = createSelector(
  fromFeature.getUserOfficeProjectState,
  (state: fromFeature.UserOfficeProjectState) => state.layout
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
