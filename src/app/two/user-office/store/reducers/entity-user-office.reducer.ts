import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserOffice } from './../../models/user-office.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-user-office.actions';

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
      return adapter.addAll(action.payload.paginationUserOffice.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
