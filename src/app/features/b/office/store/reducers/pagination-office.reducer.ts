import { createReducer, on } from '@ngrx/store';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';

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
    fromOfficeActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationOffice.total,
      perPage: entities.paginationOffice.per_page,
      currentPage: entities.paginationOffice.current_page,
      from: entities.paginationOffice.from,
      to: entities.paginationOffice.to
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadFailEntity,
    fromOfficeActions.EntityActions.StoreSuccessEntity,
    fromOfficeActions.EntityActions.Reset,
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
