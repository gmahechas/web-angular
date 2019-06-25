import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

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
    fromTypePersonActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationTypePerson.total,
      perPage: entities.paginationTypePerson.per_page,
      currentPage: entities.paginationTypePerson.current_page,
      from: entities.paginationTypePerson.from,
      to: entities.paginationTypePerson.to
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadFailEntity,
    fromTypePersonActions.EntityActions.StoreSuccessEntity,
    fromTypePersonActions.EntityActions.Reset,
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
