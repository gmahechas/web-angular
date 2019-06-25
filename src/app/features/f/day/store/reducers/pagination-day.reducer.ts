import { createReducer, on } from '@ngrx/store';
import * as fromDayActions from '@web/app/features/f/day/store/actions';

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
    fromDayActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromDayActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationDay.total,
      perPage: entities.paginationDay.per_page,
      currentPage: entities.paginationDay.current_page,
      from: entities.paginationDay.from,
      to: entities.paginationDay.to
    })
  ),
  on(
    fromDayActions.EntityActions.LoadFailEntity,
    fromDayActions.EntityActions.StoreSuccessEntity,
    fromDayActions.EntityActions.Reset,
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
