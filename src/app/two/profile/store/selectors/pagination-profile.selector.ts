import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/two/profile/store/reducers';
import * as fromPagination from '@web/app/two/profile/store/reducers/pagination-profile.reducer';

export const getPaginationState = createSelector(
    fromFeature.getProfileState,
    (state: fromFeature.ProfileState) => state.pagination
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
