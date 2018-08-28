import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from './../../models/user.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-user.actions';

export interface State extends EntityState<User> {

}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity.user_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationUser.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeUser, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateUser.user_id,
        changes: action.payload.updateUser
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyUser.user_id, state);
    }

    default:
      return state;
  }

}
