import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/b/country/store/reducers';
import * as fromPagination from '@web/app/features/b/country/store/reducers/pagination-country.reducer';

export const getPaginationState = createSelector(
    fromFeature.getCountryState,
    (state: fromFeature.CountryState) => state.pagination
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