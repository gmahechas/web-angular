import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEntity from '../reducers/entity-profile-menu.reducer';
import * as fromCore from './../../../../core/store';

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
