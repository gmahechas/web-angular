import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/user/store/reducers';
import * as fromSearch from '@app/app/two/user/store/reducers/search-user.reducer';

export const getSearchState = createSelector(
    fromFeature.getUserState,
    (state: fromFeature.UserState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
