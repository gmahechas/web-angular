import { createSelector } from '@ngrx/store';

import * as fromCore from '@app/app/core/store/reducers';
import * as fromLayout from '@app/app/core/store/reducers/layout-core.reducer';

export const getShowSidebar = createSelector(
  fromCore.getLayoutState,
  fromLayout.getShowSidebar
);

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
