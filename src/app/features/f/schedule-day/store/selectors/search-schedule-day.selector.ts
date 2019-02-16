import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule-day/store/reducers';
import * as fromSearch from '@web/app/features/f/schedule-day/store/reducers/search-schedule-day.reducer';

export const getSearchState = createSelector(
    fromFeature.getScheduleDayState,
    (state: fromFeature.ScheduleDayState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
