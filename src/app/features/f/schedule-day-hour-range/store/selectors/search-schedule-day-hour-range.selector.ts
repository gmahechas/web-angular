import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule-day-hour-range/store/reducers';
import * as fromSearch from '@web/app/features/f/schedule-day-hour-range/store/reducers/search-schedule-day-hour-range.reducer';

export const getSearchState = createSelector(
    fromFeature.getScheduleDayHourRangeState,
    (state: fromFeature.ScheduleDayHourRangeState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
