import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/a/estate/store/reducers';
import * as fromLayout from '@web/app/features/a/estate/store/reducers/layout-estate.reducer';

export const getLayoutState = createSelector(
  fromFeature.getEstateState,
  (state: fromFeature.EstateState) => state.layout
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
