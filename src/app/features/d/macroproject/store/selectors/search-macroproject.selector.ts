import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/d/macroproject/store/reducers';
import * as fromSearch from '@web/app/features/d/macroproject/store/reducers/search-macroproject.reducer';

export const getSearchState = createSelector(
    fromFeature.getMacroprojectState,
    (state: fromFeature.MacroprojectState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
