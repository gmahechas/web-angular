import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@web/app/features/c/user/models/user.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/user/store/actions/entity-user.actions';

export interface State extends EntityState<User> {
  selectedEntity: User | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (entity: User) => entity.user_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedEntity: null,
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationUser.data,
        { ...state, selectedEntity: null }
        );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selectedEntity: null });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeUser, newState);
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selectedEntity: action.payload.entity
      };
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateUser.user_id,
        changes: action.payload.entity.updateUser
      },
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyUser.user_id,
        { ...state, selectedEntity: null }
        );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selectedEntity: null });
    }

    default:
      return state;
  }

}

export const getSelectedEntity = (state: State) => state.selectedEntity;
