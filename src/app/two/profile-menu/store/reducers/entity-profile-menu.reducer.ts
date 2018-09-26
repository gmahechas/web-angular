import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProfileMenu } from './../../models/profile-menu.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-profile-menu.actions';

export interface State extends EntityState<ProfileMenu> {

}

export const adapter: EntityAdapter<ProfileMenu> = createEntityAdapter<ProfileMenu>({
  selectId: (entity: ProfileMenu) => entity.profile_menu_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationProfileMenu.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
