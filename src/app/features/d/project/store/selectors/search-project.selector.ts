import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/d/project/store/reducers';
import * as fromSearch from '@web/app/features/d/project/store/reducers/search-project.reducer';

export const getSearchState = createSelector(
    fromFeature.getProjectState,
    (state: fromFeature.ProjectState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
