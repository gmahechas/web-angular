import { EntityActionTypes, EntityActions } from '@web/app/features/b/office-department/store/actions/entity-office-department.actions';
import { SearchOfficeDepartment } from '@web/app/features/b/office-department/models/search-office-department.model';

export interface State {
  loaded: boolean;
  query: SearchOfficeDepartment;
}

export const initialState: State = {
  loaded: false,
  query: {
    office_department: {
      office_department_id: '',
      office_department_status: null
    },
    office: null,
    department: null
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
