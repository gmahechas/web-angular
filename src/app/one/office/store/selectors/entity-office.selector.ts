import { createSelector } from '@ngrx/store';

import * as fromFeature from '@app/app/one/office/store/reducers';
import * as fromEntity from '@app/app/one/office/store/reducers/entity-office.reducer';
import * as fromCore from '@app/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getOfficeState,
  (state: fromFeature.OfficeState) => state.entity
);

export const {
  selectIds: getIds, // 1,2,3...
  selectEntities: getEntities, // Key with Entities
  selectAll: getAllEntities, // Entities
  selectTotal: getTotalEntities, // total
} = fromEntity.adapter.getSelectors(getEntityState);

export const getSelectedByRouter = createSelector(
  getEntities,
  fromCore.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.office_id];
  }
);
