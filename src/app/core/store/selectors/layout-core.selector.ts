import { createSelector } from '@ngrx/store';

import * as fromCore from '@web/app/core/store/reducers';
import * as fromLayout from '@web/app/core/store/reducers/layout-core.reducer';

export const getLang = createSelector(
  fromCore.getLayoutState,
  fromLayout.getLang
);

export const getShowSidebar = createSelector(
  fromCore.getLayoutState,
  fromLayout.getShowSidebar
);

export const getBlockedDocument = createSelector(
  fromCore.getLayoutState,
  fromLayout.getBlockedDocument
);

export const getShowSpinner = createSelector(
  fromCore.getLayoutState,
  fromLayout.getShowSpinner
);

export const getOffice = createSelector(
  fromCore.getLayoutState,
  fromLayout.getOffice
);

export const getProject = createSelector(
  fromCore.getLayoutState,
  fromLayout.getProject
);
