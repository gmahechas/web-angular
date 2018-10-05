import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/three/project/store/reducers';
import * as fromLayout from '@web/app/three/project/store/reducers/layout-project.reducer';

export const getLayoutState = createSelector(
  fromFeature.getProjectState,
  (state: fromFeature.ProjectState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

