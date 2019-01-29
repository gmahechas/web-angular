import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Schedule } from '@web/app/features/f/schedule/models/schedule.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/f/schedule/store/actions/entity-schedule.actions';

export interface State extends EntityState<Schedule> { }

export const adapter: EntityAdapter<Schedule> = createEntityAdapter<Schedule>({
  selectId: (entity: Schedule) => entity.schedule_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationSchedule.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeSchedule, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateSchedule.schedule_id,
        changes: action.payload.entity.updateSchedule
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroySchedule.schedule_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
