import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-estate.reducer';

export const getLayoutState = createSelector(
  fromFeature.getEstateState,
  (state: fromFeature.EstateState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);
