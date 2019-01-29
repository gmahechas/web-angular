import { EntityActionTypes, EntityActions } from '@web/app/features/b/department/store/actions/entity-department.actions';
import { SearchDepartment } from '@web/app/features/b/department/models/search-department.model';

export interface State {
  loaded: boolean;
  query: SearchDepartment;
}

export const initialState: State = {
  loaded: false,
  query: {
    department: {
      department_id: '',
      department_name: ''
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
          department: action.payload.search.department
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
