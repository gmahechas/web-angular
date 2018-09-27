import { EntityActionTypes, EntityActions } from '../actions/entity-profile.actions';
import { SearchProfile } from '../../models/search-profile.model';

export interface State {
  loaded: boolean;
  query: SearchProfile;
}

const initialState: State = {
  loaded: false,
  query: {
    profile: {
      profile_id: '',
      profile_name: ''
    }
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

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
