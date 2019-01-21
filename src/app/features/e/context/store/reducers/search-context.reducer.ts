import { EntityActionTypes, EntityActions } from '@web/app/features/e/context/store/actions/entity-context.actions';
import { SearchContext } from '@web/app/features/e/context/models/search-context.model';

export interface State {
  loaded: boolean;
  query: SearchContext;
}

export const initialState: State = {
  loaded: false,
  query: {
    context: {
      context_id: '',
      context_description: ''
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

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
