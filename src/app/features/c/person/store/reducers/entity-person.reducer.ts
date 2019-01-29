import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Person } from '@web/app/features/c/person/models/person.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/person/store/actions/entity-person.actions';

export interface State extends EntityState<Person> { }

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (entity: Person) => entity.person_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationPerson.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storePerson, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updatePerson.person_id,
        changes: action.payload.entity.updatePerson
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyPerson.person_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
