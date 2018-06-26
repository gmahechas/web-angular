import { createSelector } from '@ngrx/store';

import * as fromCore from './../reducers';
import * as fromLayout from './../reducers/layout-core.reducer';

export const getMenuItems = createSelector(
  fromCore.getLayoutState,
  fromLayout.getMenuItems
);

export const getBlockedDocument = createSelector(
  fromCore.getLayoutState,
  fromLayout.getBlockedDocument
);

export const getShowSpinner = createSelector(
  fromCore.getLayoutState,
  fromLayout.getShowSpinner
);

export const getProgressBar = createSelector(
  fromCore.getLayoutState,
  fromLayout.getProgressBar
);
