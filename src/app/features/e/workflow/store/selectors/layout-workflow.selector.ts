import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/e/workflow/store/reducers';
import * as fromLayout from '@web/app/features/e/workflow/store/reducers/layout-workflow.reducer';

export const getLayoutState = createSelector(
  fromFeature.getWorkflowState,
  (state: fromFeature.WorkflowState) => state.layout
);

export const getError = createSelector(
  getLayoutState,
  fromLayout.getError
);

export const getPending = createSelector(
  getLayoutState,
  fromLayout.getPending
);
