import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/a/country/store/reducers';
import * as fromEntity from '@web/app/features/a/country/store/reducers/entity-country.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getCountryState,
  (state: fromFeature.CountryState) => state.entity
);

export const {
  selectIds: getIds, // 1,2,3...
  selectEntities: getEntities, // Key with Entities
  selectAll: getAllEntities, // Entities
  selectTotal: getTotalEntities, // total
} = fromEntity.adapter.getSelectors(getEntityState);

export const getSelectedEntity = createSelector(
  getEntityState,
  fromEntity.getSelectedEntity
);

export const getSelectedByRouter = createSelector(
  getEntities,
  fromCore.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.country_id];
  }
);
