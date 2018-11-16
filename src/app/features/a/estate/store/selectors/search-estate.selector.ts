import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/a/estate/store/reducers';
import * as fromSearch from '@web/app/features/a/estate/store/reducers/search-estate.reducer';

export const getSearchState = createSelector(
    fromFeature.getEstateState,
    (state: fromFeature.EstateState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
