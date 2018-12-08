import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/type-person/store/actions/entity-type-person.actions';

export interface State extends EntityState<TypePerson> {

}

export const adapter: EntityAdapter<TypePerson> = createEntityAdapter<TypePerson>({
  selectId: (entity: TypePerson) => entity.type_person_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationTypePerson.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
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
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyTypePerson.type_person_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
