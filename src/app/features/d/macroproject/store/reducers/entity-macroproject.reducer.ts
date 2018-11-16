import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/d/macroproject/store/actions/entity-macroproject.actions';

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
      return adapter.addAll(action.payload.entities.paginationMacroproject.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeMacroproject, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateMacroproject.macroproject_id,
        changes: action.payload.entity.updateMacroproject
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyMacroproject.macroproject_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
