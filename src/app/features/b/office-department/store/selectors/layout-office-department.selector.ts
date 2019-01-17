import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/b/office-department/store/reducers';
import * as fromLayout from '@web/app/features/b/office-department/store/reducers/layout-office-department.reducer';

export const getLayoutState = createSelector(
  fromFeature.getOfficeDepartmentState,
  (state: fromFeature.OfficeDepartmentState) => state.layout
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
