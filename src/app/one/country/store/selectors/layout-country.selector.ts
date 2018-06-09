import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-country.reducer';

export const getLayoutState = createSelector(
  fromFeature.getCountryState,
  (state: fromFeature.CountryState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);
