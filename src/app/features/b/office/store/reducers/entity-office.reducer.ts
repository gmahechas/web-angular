import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';
import { Office } from '@web/app/features/b/office/models/office.model';

export interface State extends EntityState<Office> { }

export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (entity: Office) => entity.office_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromOfficeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationOffice.data, state)
  ),
  on(
    fromOfficeActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromOfficeActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeOffice, newState);
    }
  ),
  on(
    fromOfficeActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateOffice.office_id, changes: entity.updateOffice }, state)
  ),
  on(
    fromOfficeActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyOffice.office_id, state)
  ),
  on(
    fromOfficeActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
