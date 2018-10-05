import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/person/store/reducers';
import * as fromLayout from '@app/app/two/person/store/reducers/layout-person.reducer';

export const getLayoutState = createSelector(
  fromFeature.getPersonState,
  (state: fromFeature.PersonState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

