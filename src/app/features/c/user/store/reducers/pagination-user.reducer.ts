import { createReducer, on } from '@ngrx/store';
import * as fromUserActions from '@web/app/features/c/user/store/actions';

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
    fromUserActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromUserActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationUser.total,
      perPage: entities.paginationUser.per_page,
      currentPage: entities.paginationUser.current_page,
      from: entities.paginationUser.from,
      to: entities.paginationUser.to
    })
  ),
  on(
    fromUserActions.EntityActions.LoadFailEntity,
    fromUserActions.EntityActions.StoreSuccessEntity,
    fromUserActions.EntityActions.Reset,
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
