import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromUserActions from '@web/app/features/c/user/store/actions';
import { User } from '@web/app/features/c/user/models/user.model';

export interface State extends EntityState<User> { }

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity.user_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromUserActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationUser.data, state)
  ),
  on(
    fromUserActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromUserActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeUser, newState);
    }
  ),
  on(
    fromUserActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateUser.user_id, changes: entity.updateUser }, state)
  ),
  on(
    fromUserActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyUser.user_id, state)
  ),
  on(
    fromUserActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
