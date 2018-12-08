import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/type-person/store/reducers';
import * as fromSearch from '@web/app/features/c/type-person/store/reducers/search-type-person.reducer';

export const getSearchState = createSelector(
    fromFeature.getTypePersonState,
    (state: fromFeature.TypePersonState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
