import { EntityActionTypes, EntityActions } from '../actions/entity-office.actions';
import { SearchOffice } from '../../models/search-office.model';

export interface State {
  loaded: boolean;
  query: SearchOffice;
}

const initialState: State = {
  loaded: false,
  query: {
    office: {
      office_id: '',
      office_name: ''
    },
    city: null
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
          office: action.payload.search.office,
          city: action.payload.search.city
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
