import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/context/store/reducers';
import * as fromLayout from '@web/app/features/e/context/store/reducers/layout-context.reducer';

export const getLayoutState = createSelector(
  fromFeature.getContextState,
  (state: fromFeature.ContextState) => state.layout
);

export const getSelected = createSelector(
  getLayoutState,
  fromLayout.getSelected
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
