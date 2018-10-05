import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/country/store/reducers';
import * as fromLayout from '@app/app/one/country/store/reducers/layout-country.reducer';

export const getLayoutState = createSelector(
  fromFeature.getCountryState,
  (state: fromFeature.CountryState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);
