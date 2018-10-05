import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/profile/store/reducers';
import * as fromSearch from '@app/app/two/profile/store/reducers/search-profile.reducer';

export const getSearchState = createSelector(
    fromFeature.getProfileState,
    (state: fromFeature.ProfileState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
