import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/person/store/reducers';
import * as fromEntity from '@web/app/features/c/person/store/reducers/entity-person.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getPersonState,
  (state: fromFeature.PersonState) => state.entity
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
    return router.state && entities[router.state.params.person_id];
  }
);
