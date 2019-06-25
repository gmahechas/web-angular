import { createReducer, on } from '@ngrx/store';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';

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
    fromCountryActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationCountry.total,
      perPage: entities.paginationCountry.per_page,
      currentPage: entities.paginationCountry.current_page,
      from: entities.paginationCountry.from,
      to: entities.paginationCountry.to
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadFailEntity,
    fromCountryActions.EntityActions.StoreSuccessEntity,
    fromCountryActions.EntityActions.Reset,
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
