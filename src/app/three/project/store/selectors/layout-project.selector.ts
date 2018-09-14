import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromLayout from '../reducers/layout-project.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProjectState,
  (state: fromFeature.ProjectState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

