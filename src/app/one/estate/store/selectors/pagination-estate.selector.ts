import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/estate/store/reducers';
import * as fromPagination from '@app/app/one/estate/store/reducers/pagination-estate.reducer';

export const getPaginationState = createSelector(
    fromFeature.getEstateState,
    (state: fromFeature.EstateState) => state.pagination
);

export const getTotal = createSelector(
    getPaginationState,
    fromPagination.getTotal
);

export const getPerPage = createSelector(
    getPaginationState,
    fromPagination.getPerPage
);

export const getCurrentPage = createSelector(
    getPaginationState,
    fromPagination.getCurrentPage
);

export const getFrom = createSelector(
    getPaginationState,
    fromPagination.getFrom
);

export const getTo = createSelector(
    getPaginationState,
    fromPagination.getTo
);
