import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/three/project/store/reducers';
import * as fromSearch from '@app/app/three/project/store/reducers/search-project.reducer';

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
