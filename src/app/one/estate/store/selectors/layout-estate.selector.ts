import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/estate/store/reducers';
import * as fromLayout from '@app/app/one/estate/store/reducers/layout-estate.reducer';

export const getLayoutState = createSelector(
  fromFeature.getEstateState,
  (state: fromFeature.EstateState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);
