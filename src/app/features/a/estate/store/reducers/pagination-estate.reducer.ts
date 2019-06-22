import { createReducer, on } from '@ngrx/store';
import { EntityActions } from '@web/app/features/a/estate/store/actions';

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
    EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationEstate.total,
      perPage: entities.paginationEstate.per_page,
      currentPage: entities.paginationEstate.current_page,
      from: entities.paginationEstate.from,
      to: entities.paginationEstate.to
    })
  ),
  on(
    EntityActions.LoadFailEntity,
    EntityActions.StoreSuccessEntity,
    EntityActions.Reset,
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
