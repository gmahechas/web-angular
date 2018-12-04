import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/d/user-office-project/store/reducers';
import * as fromSearch from '@web/app/features/d/user-office-project/store/reducers/search-user-office-project.reducer';

export const getSearchState = createSelector(
    fromFeature.getUserOfficeProjectState,
    (state: fromFeature.UserOfficeProjectState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
