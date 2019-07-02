import { createReducer, on } from '@ngrx/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

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
    fromProfileMenuActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationProfileMenu.total,
      perPage: entities.paginationProfileMenu.per_page,
      currentPage: entities.paginationProfileMenu.current_page,
      from: entities.paginationProfileMenu.from,
      to: entities.paginationProfileMenu.to
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadFailEntity,
    fromProfileMenuActions.EntityActions.StoreSuccessEntity,
    fromProfileMenuActions.EntityActions.Reset,
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
