import { EntityActionTypes, EntityActions } from '@web/app/features/d/user-office-project/store/actions/entity-user-office-project.actions';
import { SearchUserOfficeProject } from '@web/app/features/d/user-office-project/models/search-user-office-project.model';

export interface State {
  loaded: boolean;
  query: SearchUserOfficeProject;
}

export const initialState: State = {
  loaded: false,
  query: {
    user_office_project: {
      user_office_project_id: '',
      user_office_project_status: null
    },
    user_office: null,
    project: null
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

    case EntityActionTypes.Reset: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
