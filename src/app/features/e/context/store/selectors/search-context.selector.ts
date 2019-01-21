import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/context/store/reducers';
import * as fromSearch from '@web/app/features/e/context/store/reducers/search-context.reducer';

export const getSearchState = createSelector(
    fromFeature.getContextState,
    (state: fromFeature.ContextState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
