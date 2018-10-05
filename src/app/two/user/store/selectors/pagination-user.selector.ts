import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/user/store/reducers';
import * as fromPagination from '@app/app/two/user/store/reducers/pagination-user.reducer';

export const getPaginationState = createSelector(
    fromFeature.getUserState,
    (state: fromFeature.UserState) => state.pagination
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
