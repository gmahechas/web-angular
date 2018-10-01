import { EntityActionTypes, EntityActions } from '../actions/entity-profile-menu.actions';
import { SearchProfileMenu } from '../../models/search-profile-menu.model';

export interface State {
  loaded: boolean;
  query: SearchProfileMenu;
}

const initialState: State = {
  loaded: false,
  query: {
    profile_menu: {
      profile_menu_id: '',
      profile_menu_status: ''
    },
    profile: {
      profile_id: ''
    },
    menu: {
      menu_id: ''
    }
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity: {
      return {
        ...state,
        loaded: false,
        query: { ...state.query, ...action.payload.search }
      };
    }

    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
        loaded: true
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return {
        ...state,
        loaded: false
      };
    }

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
