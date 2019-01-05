import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/type-person-identification/store/reducers';
import * as fromLayout from '@web/app/features/c/type-person-identification/store/reducers/layout-type-person-identification.reducer';

export const getLayoutState = createSelector(
  fromFeature.getTypePersonIdentificationState,
  (state: fromFeature.TypePersonIdentificationState) => state.layout
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
