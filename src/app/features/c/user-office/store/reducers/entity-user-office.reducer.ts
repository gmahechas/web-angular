import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserOffice } from '@web/app/features/c/user-office/models/user-office.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/c/user-office/store/actions/entity-user-office.actions';

export interface State extends EntityState<UserOffice> { }

export const adapter: EntityAdapter<UserOffice> = createEntityAdapter<UserOffice>({
  selectId: (entity: UserOffice) => entity.user_office_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationUserOffice.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeUserOffice, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateUserOffice.user_office_id,
        changes: action.payload.entity.updateUserOffice
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyUserOffice.user_office_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
