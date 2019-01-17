import { EntityActionTypes, EntityActions } from '@web/app/features/e/workflow/store/actions/entity-workflow.actions';
import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

export interface State {
  loaded: boolean;
  query: SearchWorkflow;
}

export const initialState: State = {
  loaded: false,
  query: {
    workflow: {
      workflow_id: '',
      workflow_name: ''
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
        query: { ...state.query, ...action.payload.search }
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
