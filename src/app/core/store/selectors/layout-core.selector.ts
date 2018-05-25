import { createSelector } from '@ngrx/store';

import * as fromLayout from './../reducers/layout-core.reducer';
import * as fromCore from './../reducers';

export const getMenuItems = createSelector(
  fromCore.getLayoutState,
  fromLayout.getMenuItems
);

export const getShowSidenav = createSelector(
  fromCore.getLayoutState,
  fromLayout.getShowSidenav
);

export const getBlockedDocument = createSelector(
  fromCore.getLayoutState,
  fromLayout.getBlockedDocument
);
