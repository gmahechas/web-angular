import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Macroproject } from './../../models/macroproject.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-macroproject.actions';

export interface State extends EntityState<Macroproject> {

}

export const adapter: EntityAdapter<Macroproject> = createEntityAdapter<Macroproject>({
  selectId: (entity: Macroproject) => entity.macroproject_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationMacroproject.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeMacroproject, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateMacroproject.macroproject_id,
        changes: action.payload.updateMacroproject
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyMacroproject.macroproject_id, state);
    }

    default:
      return state;
  }

}
