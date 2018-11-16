import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/person/store/reducers';
import * as fromLayout from '@web/app/features/c/person/store/reducers/layout-person.reducer';

export const getLayoutState = createSelector(
  fromFeature.getPersonState,
  (state: fromFeature.PersonState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
