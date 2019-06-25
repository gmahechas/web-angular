import { createReducer, on } from '@ngrx/store';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';

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
    fromProjectActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationProject.total,
      perPage: entities.paginationProject.per_page,
      currentPage: entities.paginationProject.current_page,
      from: entities.paginationProject.from,
      to: entities.paginationProject.to
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadFailEntity,
    fromProjectActions.EntityActions.StoreSuccessEntity,
    fromProjectActions.EntityActions.Reset,
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
