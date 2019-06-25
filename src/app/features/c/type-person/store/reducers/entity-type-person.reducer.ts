import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';
import { TypePerson } from '@web/app/features/c/type-person/models/type-person.model';

export interface State extends EntityState<TypePerson> { }

export const adapter: EntityAdapter<TypePerson> = createEntityAdapter<TypePerson>({
  selectId: (entity: TypePerson) => entity.type_person_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationTypePerson.data, state)
  ),
  on(
    fromTypePersonActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromTypePersonActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeTypePerson, newState);
    }
  ),
  on(
    fromTypePersonActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateTypePerson.type_person_id, changes: entity.updateTypePerson }, state)
  ),
  on(
    fromTypePersonActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyTypePerson.type_person_id, state)
  ),
  on(
    fromTypePersonActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
