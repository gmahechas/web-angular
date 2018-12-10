import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/type-person-identification/store/actions/entity-type-person-identification.actions';

export interface State extends EntityState<TypePersonIdentification> {

}

export const adapter: EntityAdapter<TypePersonIdentification> = createEntityAdapter<TypePersonIdentification>({
  selectId: (entity: TypePersonIdentification) => entity.type_person_identification_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationTypePersonIdentification.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeTypePersonIdentification, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateTypePersonIdentification.type_person_identification_id,
        changes: action.payload.entity.updateTypePersonIdentification
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyTypePersonIdentification.type_person_identification_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
