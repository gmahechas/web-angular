import { EntityActionTypes, EntityActions } from '../actions/entity-city.actions';
import { SearchCity } from '../../models/search-city.model';

export interface State {
  loaded: boolean;
  query: SearchCity;
}

const initialState: State = {
  loaded: false,
  query: {
    city: {
      city_id: '',
      city_name: '',
      city_code: ''
    },
    estate: null
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
          city: action.payload.search.city,
          estate: action.payload.search.estate
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
