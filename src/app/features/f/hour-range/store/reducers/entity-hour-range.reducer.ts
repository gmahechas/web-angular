import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HourRange } from '@web/app/features/f/hour-range/models/hour-range.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/f/hour-range/store/actions/entity-hour-range.actions';

export interface State extends EntityState<HourRange> { }

export const adapter: EntityAdapter<HourRange> = createEntityAdapter<HourRange>({
  selectId: (entity: HourRange) => entity.hour_range_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationHourRange.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeHourRange, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateHourRange.hour_range_id,
        changes: action.payload.entity.updateHourRange
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyHourRange.hour_range_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
