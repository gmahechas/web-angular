import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EntityActions } from '@web/app/features/a/estate/store/actions';
import { Estate } from '@web/app/features/a/estate/models/estate.model';

export interface State extends EntityState<Estate> { }

export const adapter: EntityAdapter<Estate> = createEntityAdapter<Estate>({
  selectId: (entity: Estate) => entity.estate_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationEstate.data, state)
  ),
  on(
    EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeEstate, newState);
    }
  ),
  on(
    EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateEstate.estate_id, changes: entity.updateEstate }, state)
  ),
  on(
    EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyEstate.estate_id, state)
  ),
  on(
    EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
