import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/two/profile-menu/store/reducers';
import * as fromEntity from '@app/app/two/profile-menu/store/reducers/entity-profile-menu.reducer';
import * as fromCore from '@app/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getProfileMenuState,
  (state: fromFeature.ProfileMenuState) => state.entity
);

export const {
  selectIds: getIds, // 1,2,3...
  selectEntities: getEntities, // Key with Entities
  selectAll: getAllEntities, // Entities
  selectTotal: getTotalEntities, // total
} = fromEntity.adapter.getSelectors(getEntityState);
