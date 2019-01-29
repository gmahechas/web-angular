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

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
