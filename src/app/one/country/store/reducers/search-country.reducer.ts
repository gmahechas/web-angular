import { EntityActionTypes, EntityActions } from '../actions/entity-country.actions';
import { SearchCountry } from '../../models/search-country.model';

export interface State {
  loaded: boolean;
  query: SearchCountry;
}

const initialState: State = {
  loaded: false,
  query: {
    country_code: '',
    country_name: ''
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: action.payload
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
