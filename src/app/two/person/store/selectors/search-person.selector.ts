import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/person/store/reducers';
import * as fromSearch from '@app/app/two/person/store/reducers/search-person.reducer';

export const getSearchState = createSelector(
    fromFeature.getPersonState,
    (state: fromFeature.PersonState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
