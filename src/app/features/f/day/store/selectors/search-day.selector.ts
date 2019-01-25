import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/day/store/reducers';
import * as fromSearch from '@web/app/features/f/day/store/reducers/search-day.reducer';

export const getSearchState = createSelector(
    fromFeature.getDayState,
    (state: fromFeature.DayState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
