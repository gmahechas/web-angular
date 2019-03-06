import { createSelector } from '@ngrx/store';

import * as fromFeature from '@web/app/features/f/schedule-day-hour-range/store/reducers';
import * as fromEntity from '@web/app/features/f/schedule-day-hour-range/store/reducers/entity-schedule-day-hour-range.reducer';
import * as fromCore from '@web/app/core/store';

export const getEntityState = createSelector(
  fromFeature.getScheduleDayHourRangeState,
  (state: fromFeature.ScheduleDayHourRangeState) => state.entity
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
    return (router) ? router.state && entities[router.state.params.schedule_day_hour_range_id] : null;
  }
);
