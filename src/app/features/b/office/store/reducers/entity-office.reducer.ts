import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Office } from '@web/app/features/b/office/models/office.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/b/office/store/actions/entity-office.actions';

export interface State extends EntityState<Office> {
  selected: {
    selectedEntity: Office | null;
  };
}

export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (entity: Office) => entity.office_id,
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
        action.payload.entities.paginationOffice.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeOffice, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateOffice.office_id,
        changes: action.payload.entity.updateOffice
      },
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyOffice.office_id,
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
