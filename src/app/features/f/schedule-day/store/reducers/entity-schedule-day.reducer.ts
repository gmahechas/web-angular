import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ScheduleDay } from '@web/app/features/f/schedule-day/models/schedule-day.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/f/schedule-day/store/actions/entity-schedule-day.actions';

export interface State extends EntityState<ScheduleDay> { }

export const adapter: EntityAdapter<ScheduleDay> = createEntityAdapter<ScheduleDay>({
  selectId: (entity: ScheduleDay) => entity.schedule_day_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationScheduleDay.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeScheduleDay, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateScheduleDay.schedule_day_id,
        changes: action.payload.entity.updateScheduleDay
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyScheduleDay.schedule_day_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
