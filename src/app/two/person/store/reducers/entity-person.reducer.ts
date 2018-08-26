import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Person } from './../../models/person.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-person.actions';

export interface State extends EntityState<Person> {

}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (entity: Person) => entity.person_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationPerson.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storePerson, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updatePerson.person_id,
        changes: action.payload.updatePerson
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyPerson.person_id, state);
    }

    default:
      return state;
  }

}
