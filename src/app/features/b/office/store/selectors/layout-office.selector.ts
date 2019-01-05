import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/b/office/store/reducers';
import * as fromLayout from '@web/app/features/b/office/store/reducers/layout-office.reducer';

export const getLayoutState = createSelector(
  fromFeature.getOfficeState,
  (state: fromFeature.OfficeState) => state.layout
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
