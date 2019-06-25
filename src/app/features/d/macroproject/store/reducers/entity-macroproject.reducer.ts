import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';
import { Macroproject } from '@web/app/features/d/macroproject/models/macroproject.model';

export interface State extends EntityState<Macroproject> { }

export const adapter: EntityAdapter<Macroproject> = createEntityAdapter<Macroproject>({
  selectId: (entity: Macroproject) => entity.macroproject_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromMacroprojectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationMacroproject.data, state)
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromMacroprojectActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeMacroproject, newState);
    }
  ),
  on(
    fromMacroprojectActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateMacroproject.macroproject_id, changes: entity.updateMacroproject }, state)
  ),
  on(
    fromMacroprojectActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyMacroproject.macroproject_id, state)
  ),
  on(
    fromMacroprojectActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
