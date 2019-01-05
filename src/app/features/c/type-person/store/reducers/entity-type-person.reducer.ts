import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/type-person/store/actions/entity-type-person.actions';

export interface State extends EntityState<TypePerson> {
  selected: {
    selectedEntity: TypePerson | null;
  };
}

export const adapter: EntityAdapter<TypePerson> = createEntityAdapter<TypePerson>({
  selectId: (entity: TypePerson) => entity.type_person_id,
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
        action.payload.entities.paginationTypePerson.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeTypePerson, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateTypePerson.type_person_id,
        changes: action.payload.entity.updateTypePerson
      },
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyTypePerson.type_person_id,
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
