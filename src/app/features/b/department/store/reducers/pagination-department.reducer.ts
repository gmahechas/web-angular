import { createReducer, on } from '@ngrx/store';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';

export interface State {
  total: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

export const initialState: State = {
  total: null,
  perPage: null,
  currentPage: null,
  from: null,
  to: null
};

export const reducer = createReducer(
  initialState,
  on(
    fromDepartmentActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationDepartment.total,
      perPage: entities.paginationDepartment.per_page,
      currentPage: entities.paginationDepartment.current_page,
      from: entities.paginationDepartment.from,
      to: entities.paginationDepartment.to
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadFailEntity,
    fromDepartmentActions.EntityActions.StoreSuccessEntity,
    fromDepartmentActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getTotal = (state: State) => state.total;
export const getPerPage = (state: State) => state.perPage;
export const getCurrentPage = (state: State) => state.currentPage;
export const getFrom = (state: State) => state.from;
export const getTo = (state: State) => state.to;
