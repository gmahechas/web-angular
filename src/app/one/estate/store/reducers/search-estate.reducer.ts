import { EntityActionTypes, EntityActions } from '@app/app/one/estate/store/actions/entity-estate.actions';
import { SearchEstate } from '@app/app/one/estate/models/search-estate.model';

export interface State {
  loaded: boolean;
  query: SearchEstate;
}

export const initialState: State = {
  loaded: false,
  query: {
    estate: {
      estate_id: '',
      estate_name: '',
      estate_code: ''
    },
    country: null
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
          estate: action.payload.search.estate,
          country: action.payload.search.country
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
