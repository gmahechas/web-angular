import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule/store/reducers';
import * as fromSearch from '@web/app/features/f/schedule/store/reducers/search-schedule.reducer';

export const getSearchState = createSelector(
    fromFeature.getScheduleState,
    (state: fromFeature.ScheduleState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
