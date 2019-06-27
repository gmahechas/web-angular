import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';
import { TypePersonIdentification } from '@web/app/features/c/type-person-identification/models/type-person-identification.model';

export interface State extends EntityState<TypePersonIdentification> { }

export const adapter: EntityAdapter<TypePersonIdentification> = createEntityAdapter<TypePersonIdentification>({
  selectId: (entity: TypePersonIdentification) => entity.type_person_identification_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationTypePersonIdentification.data, state)
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeTypePersonIdentification, newState);
    }
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({
      id: entity.updateTypePersonIdentification.type_person_identification_id, changes: entity.updateTypePersonIdentification
    }, state)
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyTypePersonIdentification.type_person_identification_id, state)
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
