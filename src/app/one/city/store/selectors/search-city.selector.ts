import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/city/store/reducers';
import * as fromSearch from '@app/app/one/city/store/reducers/search-city.reducer';

export const getSearchState = createSelector(
    fromFeature.getCityState,
    (state: fromFeature.CityState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
