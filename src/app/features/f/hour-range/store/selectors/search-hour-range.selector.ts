import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/hour-range/store/reducers';
import * as fromSearch from '@web/app/features/f/hour-range/store/reducers/search-hour-range.reducer';

export const getSearchState = createSelector(
    fromFeature.getHourRangeState,
    (state: fromFeature.HourRangeState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
