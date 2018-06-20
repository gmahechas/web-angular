import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Estate } from './../../models/estate.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-estate.actions';

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
      return adapter.addAll(action.payload.paginationEstate.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeEstate, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateEstate.estate_id,
        changes: action.payload.updateEstate
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyEstate.estate_id, state);
    }

    default:
      return state;
  }

}