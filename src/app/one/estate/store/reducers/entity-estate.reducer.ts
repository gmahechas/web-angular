import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Estate } from '@web/app/one/estate/models/estate.model';
import { EntityActionTypes, EntityActions } from '@web/app/one/estate/store/actions/entity-estate.actions';

export interface State extends EntityState<Estate> {

}

export const adapter: EntityAdapter<Estate> = createEntityAdapter<Estate>({
  selectId: (entity: Estate) => entity.estate_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationEstate.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeEstate, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateEstate.estate_id,
        changes: action.payload.entity.updateEstate
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyEstate.estate_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
