import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/schedule-day-hour-range.model';
import {
  EntityActionTypes,
  EntityActions
} from '@web/app/features/f/schedule-day-hour-range/store/actions/entity-schedule-day-hour-range.actions';

export interface State extends EntityState<ScheduleDayHourRange> { }

export const adapter: EntityAdapter<ScheduleDayHourRange> = createEntityAdapter<ScheduleDayHourRange>({
  selectId: (entity: ScheduleDayHourRange) => entity.schedule_day_hour_range_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationScheduleDayHourRange.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.entity.storeScheduleDayHourRange, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateScheduleDayHourRange.schedule_day_hour_range_id,
        changes: action.payload.entity.updateScheduleDayHourRange
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyScheduleDayHourRange.schedule_day_hour_range_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
