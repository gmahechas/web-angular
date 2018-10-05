import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@web/app/two/user/models/user.model';
import { EntityActionTypes, EntityActions } from '@web/app/two/user/store/actions/entity-user.actions';

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
      return adapter.addAll(action.payload.entities.paginationUser.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeUser, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateUser.user_id,
        changes: action.payload.entity.updateUser
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyUser.user_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
