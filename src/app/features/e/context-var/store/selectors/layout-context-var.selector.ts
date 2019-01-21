import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/context-var/store/reducers';
import * as fromLayout from '@web/app/features/e/context-var/store/reducers/layout-context-var.reducer';

export const getLayoutState = createSelector(
  fromFeature.getContextVarState,
  (state: fromFeature.ContextVarState) => state.layout
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
