import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';

export interface State extends EntityState<UserOffice> { }

export const adapter: EntityAdapter<UserOffice> = createEntityAdapter<UserOffice>({
  selectId: (entity: UserOffice) => entity.user_office_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationUserOffice.data, state)
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromUserOfficeActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeUserOffice, newState);
    }
  ),
  on(
    fromUserOfficeActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateUserOffice.user_office_id, changes: entity.updateUserOffice }, state)
  ),
  on(
    fromUserOfficeActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyUserOffice.user_office_id, state)
  ),
  on(
    fromUserOfficeActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
