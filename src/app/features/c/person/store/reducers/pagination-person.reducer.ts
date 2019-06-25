import { createReducer, on } from '@ngrx/store';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';

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
    fromPersonActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationPerson.total,
      perPage: entities.paginationPerson.per_page,
      currentPage: entities.paginationPerson.current_page,
      from: entities.paginationPerson.from,
      to: entities.paginationPerson.to
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadFailEntity,
    fromPersonActions.EntityActions.StoreSuccessEntity,
    fromPersonActions.EntityActions.Reset,
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
