import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/c/type-person/store/reducers';
import * as fromEntity from '@web/app/features/c/type-person/store/reducers/entity-type-person.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getTypePersonState,
  (state: fromFeature.TypePersonState) => state.entity
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
    return (router) ? router.state && entities[router.state.params.type_person_id] : null;
  }
);
