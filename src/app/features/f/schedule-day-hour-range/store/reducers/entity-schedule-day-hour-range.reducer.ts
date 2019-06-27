import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';
import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';

export interface State extends EntityState<ScheduleDayHourRange> { }

export const adapter: EntityAdapter<ScheduleDayHourRange> = createEntityAdapter<ScheduleDayHourRange>({
  selectId: (entity: ScheduleDayHourRange) => entity.schedule_day_hour_range_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationScheduleDayHourRange.data, state)
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeScheduleDayHourRange, newState);
    }
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({
      id: entity.updateScheduleDayHourRange.schedule_day_hour_range_id, changes: entity.updateScheduleDayHourRange
    }, state)
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyScheduleDayHourRange.schedule_day_hour_range_id, state)
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
