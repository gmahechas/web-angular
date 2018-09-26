import { EntityActionTypes, EntityActions } from '../actions/entity-project.actions';
import { SearchProject } from '../../models/search-project.model';

export interface State {
  loaded: boolean;
  query: SearchProject;
}

const initialState: State = {
  loaded: false,
  query: {
    project: {
      project_id: '',
      project_name: ''
    },
    macroproject: null
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: action.payload.search
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
