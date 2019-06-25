import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';

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
    fromTypePersonIdentificationActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationTypePersonIdentification.total,
      perPage: entities.paginationTypePersonIdentification.per_page,
      currentPage: entities.paginationTypePersonIdentification.current_page,
      from: entities.paginationTypePersonIdentification.from,
      to: entities.paginationTypePersonIdentification.to
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadFailEntity,
    fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity,
    fromTypePersonIdentificationActions.EntityActions.Reset,
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
