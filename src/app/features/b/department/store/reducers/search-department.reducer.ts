import { createReducer, on } from '@ngrx/store';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';
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

export const reducer = createReducer(
  initialState,
  on(
    fromDepartmentActions.EntityActions.LoadEntity,
    fromDepartmentActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        department: search.department
      }
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromDepartmentActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
