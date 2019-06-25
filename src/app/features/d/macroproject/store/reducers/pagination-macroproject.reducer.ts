import { createReducer, on } from '@ngrx/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';

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
    fromMacroprojectActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationMacroproject.total,
      perPage: entities.paginationMacroproject.per_page,
      currentPage: entities.paginationMacroproject.current_page,
      from: entities.paginationMacroproject.from,
      to: entities.paginationMacroproject.to
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadFailEntity,
    fromMacroprojectActions.EntityActions.StoreSuccessEntity,
    fromMacroprojectActions.EntityActions.Reset,
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
