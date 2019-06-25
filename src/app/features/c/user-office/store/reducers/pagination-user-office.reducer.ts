import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

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
    fromUserOfficeActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationUserOffice.total,
      perPage: entities.paginationUserOffice.per_page,
      currentPage: entities.paginationUserOffice.current_page,
      from: entities.paginationUserOffice.from,
      to: entities.paginationUserOffice.to
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadFailEntity,
    fromUserOfficeActions.EntityActions.StoreSuccessEntity,
    fromUserOfficeActions.EntityActions.Reset,
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
