import { EntityActionTypes, EntityActions } from '../actions/entity-country.actions';
import { SearchCountry } from '../../models/search-country.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  error: string;
  query: SearchCountry;
}

const initialState: State = {
  loaded: false,
  loading: false,
  error: '',
  query: {
    country_code: '',
    country_name: ''
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.EntityLoad: {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        query: action.payload
      };
    }

    case EntityActionTypes.EntityLoadSuccess: {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: ''
      };
    }

    case EntityActionTypes.EntityLoadFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getQuery = (state: State) => state.query;
