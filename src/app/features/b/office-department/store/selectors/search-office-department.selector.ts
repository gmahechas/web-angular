import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/b/office-department/store/reducers';
import * as fromSearch from '@web/app/features/b/office-department/store/reducers/search-office-department.reducer';

export const getSearchState = createSelector(
    fromFeature.getOfficeDepartmentState,
    (state: fromFeature.OfficeDepartmentState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
