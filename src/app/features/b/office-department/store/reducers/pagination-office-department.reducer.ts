import { createReducer, on } from '@ngrx/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

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
    fromOfficeDepartmentActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationOfficeDepartment.total,
      perPage: entities.paginationOfficeDepartment.per_page,
      currentPage: entities.paginationOfficeDepartment.current_page,
      from: entities.paginationOfficeDepartment.from,
      to: entities.paginationOfficeDepartment.to
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadFailEntity,
    fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity,
    fromOfficeDepartmentActions.EntityActions.Reset,
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
