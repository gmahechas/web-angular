import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/type-person-identification/store/reducers';
import * as fromSearch from '@web/app/features/c/type-person-identification/store/reducers/search-type-person-identification.reducer';

export const getSearchState = createSelector(
    fromFeature.getTypePersonIdentificationState,
    (state: fromFeature.TypePersonIdentificationState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
