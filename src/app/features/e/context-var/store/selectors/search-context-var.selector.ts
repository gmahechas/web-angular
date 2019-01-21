import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/context-var/store/reducers';
import * as fromSearch from '@web/app/features/e/context-var/store/reducers/search-context-var.reducer';

export const getSearchState = createSelector(
    fromFeature.getContextVarState,
    (state: fromFeature.ContextVarState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
