import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/one/country/store/reducers';
import * as fromSearch from '@web/app/one/country/store/reducers/search-country.reducer';

export const getSearchState = createSelector(
    fromFeature.getCountryState,
    (state: fromFeature.CountryState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
