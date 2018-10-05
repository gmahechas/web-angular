import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/three/project/store/reducers';
import * as fromEntity from '@web/app/three/project/store/reducers/entity-project.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getProjectState,
  (state: fromFeature.ProjectState) => state.entity
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
    return router.state && entities[router.state.params.project_id];
  }
);
