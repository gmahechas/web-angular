import { createReducer, on } from '@ngrx/store';
import * as fromCityActions from '@web/app/features/a/city/store/actions';

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
    fromCityActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromCityActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationCity.total,
      perPage: entities.paginationCity.per_page,
      currentPage: entities.paginationCity.current_page,
      from: entities.paginationCity.from,
      to: entities.paginationCity.to
    })
  ),
  on(
    fromCityActions.EntityActions.LoadFailEntity,
    fromCityActions.EntityActions.StoreSuccessEntity,
    fromCityActions.EntityActions.Reset,
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
