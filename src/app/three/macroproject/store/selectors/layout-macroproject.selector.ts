import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/three/macroproject/store/reducers';
import * as fromLayout from '@app/app/three/macroproject/store/reducers/layout-macroproject.reducer';

export const getLayoutState = createSelector(
  fromFeature.getMacroprojectState,
  (state: fromFeature.MacroprojectState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

