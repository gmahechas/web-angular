import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/office/store/reducers';
import * as fromSearch from '@app/app/one/office/store/reducers/search-office.reducer';

export const getSearchState = createSelector(
    fromFeature.getOfficeState,
    (state: fromFeature.OfficeState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
