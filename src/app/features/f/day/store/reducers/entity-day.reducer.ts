import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Day } from '@web/app/features/f/day/models/day.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/f/day/store/actions/entity-day.actions';

export interface State extends EntityState<Day> { }

export const adapter: EntityAdapter<Day> = createEntityAdapter<Day>({
  selectId: (entity: Day) => entity.day_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationDay.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeDay, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateDay.day_id,
        changes: action.payload.entity.updateDay
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyDay.day_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
