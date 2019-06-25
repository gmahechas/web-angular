import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';
import { Person } from '@web/app/features/c/person/models/person.model';

export interface State extends EntityState<Person> { }

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (entity: Person) => entity.person_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromPersonActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationPerson.data, state)
  ),
  on(
    fromPersonActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromPersonActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storePerson, newState);
    }
  ),
  on(
    fromPersonActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updatePerson.person_id, changes: entity.updatePerson }, state)
  ),
  on(
    fromPersonActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyPerson.person_id, state)
  ),
  on(
    fromPersonActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
