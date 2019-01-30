import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/user-office/store/reducers';
import * as fromPagination from '@web/app/features/c/user-office/store/reducers/pagination-user-office.reducer';

export const getPaginationState = createSelector(
    fromFeature.getUserOfficeState,
    (state: fromFeature.UserOfficeState) => state.pagination
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
