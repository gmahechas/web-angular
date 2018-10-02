import { EntityActionTypes, EntityActions } from '../actions/entity-user.actions';
import { SearchUser } from '../../models/search-user.model';

export interface State {
  loaded: boolean;
  query: SearchUser;
}

export const initialState: State = {
  loaded: false,
  query: {
    user: {
      user_id: '',
      username: '',
      email: ''
    },
    person: null,
    profile: null
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: {
          user: action.payload.search.user,
          person: action.payload.search.person,
          profile: action.payload.search.profile
        }
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
