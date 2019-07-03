import { createReducer, on } from '@ngrx/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';
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

export const reducer = createReducer(
  initialState,
  on(
    fromOfficeDepartmentActions.EntityActions.LoadEntity,
    fromOfficeDepartmentActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        office_department: search.office_department,
        office: search.office,
        department: search.department
      }
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
