import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-city.reducer';

export const getLayoutState = createSelector(
  fromFeature.getCityState,
  (state: fromFeature.CityState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

