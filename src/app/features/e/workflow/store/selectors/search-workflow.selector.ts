import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/workflow/store/reducers';
import * as fromSearch from '@web/app/features/e/workflow/store/reducers/search-workflow.reducer';

export const getSearchState = createSelector(
    fromFeature.getWorkflowState,
    (state: fromFeature.WorkflowState) => state.search
);

export const getLoaded = createSelector(
    getSearchState,
    fromSearch.getLoaded
);

export const getQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);
