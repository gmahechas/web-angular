import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-person.reducer';

export const getLayoutState = createSelector(
  fromFeature.getPersonState,
  (state: fromFeature.PersonState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

