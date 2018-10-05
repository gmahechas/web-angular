import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserOffice } from '@app/app/two/user-office/models/user-office.model';
import { EntityActionTypes, EntityActions } from '@app/app/two/user-office/store/actions/entity-user-office.actions';

export interface State extends EntityState<UserOffice> {

}

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

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
