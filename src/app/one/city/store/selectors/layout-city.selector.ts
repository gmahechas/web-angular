import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/one/city/store/reducers';
import * as fromLayout from '@web/app/one/city/store/reducers/layout-city.reducer';

export const getLayoutState = createSelector(
  fromFeature.getCityState,
  (state: fromFeature.CityState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
