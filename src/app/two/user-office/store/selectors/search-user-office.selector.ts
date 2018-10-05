import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/user-office/store/reducers';
import * as fromSearch from '@app/app/two/user-office/store/reducers/search-user-office.reducer';

export const getSearchState = createSelector(
    fromFeature.getUserOfficeState,
    (state: fromFeature.UserOfficeState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
