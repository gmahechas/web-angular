import { EntityActionTypes, EntityActions } from '../actions/entity-macroproject.actions';
import { SearchMacroproject } from '../../models/search-macroproject.model';

export interface State {
  loaded: boolean;
  query: SearchMacroproject;
}

const initialState: State = {
  loaded: false,
  query: {
    macroproject: {
      macroproject_id: '',
      macroproject_name: ''
    },
    city: null,
    office: null
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
