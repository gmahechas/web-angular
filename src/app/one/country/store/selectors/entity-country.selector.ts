import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEntity from '../reducers/entity-country.reducer';
import * as fromCore from './../../../../core/store';

export const getEntityState = createSelector(
  fromFeature.getCountryState,
  (state: fromFeature.CountryState) => state.entity
);

export const {
  selectIds: getIds,
  selectEntities: getEntities,
  selectAll: getAllEntities,
  selectTotal: getTotalEntities,
} = fromEntity.adapter.getSelectors(getEntityState);

export const getSelectedId = createSelector(
  getEntityState,
  fromEntity.getSelectedId
);

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSelectedByRouter = createSelector(
  getEntities,
  fromCore.getRouterState,
  (entities, router) => {
    return router.state && entities[router.state.params.country_id];
  }
);
