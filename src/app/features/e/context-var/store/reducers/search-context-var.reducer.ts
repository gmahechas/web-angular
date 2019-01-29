import { EntityActionTypes, EntityActions } from '@web/app/features/e/context-var/store/actions/entity-context-var.actions';
import { SearchContextVar } from '@web/app/features/e/context-var/models/search-context-var.model';

export interface State {
  loaded: boolean;
  query: SearchContextVar;
}

export const initialState: State = {
  loaded: false,
  query: {
    context_var: {
      context_var_id: '',
      context_var_code: '',
      context_var_type: '',
      context_var_description: ''
    },
    context: null
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
          context_var: action.payload.search.context_var,
          context: action.payload.search.context
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

    case EntityActionTypes.Reset: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
