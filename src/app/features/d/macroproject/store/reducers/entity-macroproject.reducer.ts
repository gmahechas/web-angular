import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/d/macroproject/store/actions/entity-macroproject.actions';

export interface State extends EntityState<Macroproject> {
  selected: {
    selectedEntity: Macroproject | null;
  };
}

export const adapter: EntityAdapter<Macroproject> = createEntityAdapter<Macroproject>({
  selectId: (entity: Macroproject) => entity.macroproject_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selected: {
    selectedEntity: null
  }
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationMacroproject.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
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
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyMacroproject.macroproject_id,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selected: { selectedEntity: action.payload.entity }
      };
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
