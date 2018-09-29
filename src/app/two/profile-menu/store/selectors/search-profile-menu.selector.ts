import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSearch from '../reducers/search-profile-menu.reducer';

export const getSearchState = createSelector(
    fromFeature.getProfileMenuState,
    (state: fromFeature.ProfileMenuState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
