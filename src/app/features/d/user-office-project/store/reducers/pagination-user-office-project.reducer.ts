import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

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
    fromUserOfficeProjectActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationUserOfficeProject.total,
      perPage: entities.paginationUserOfficeProject.per_page,
      currentPage: entities.paginationUserOfficeProject.current_page,
      from: entities.paginationUserOfficeProject.from,
      to: entities.paginationUserOfficeProject.to
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadFailEntity,
    fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity,
    fromUserOfficeProjectActions.EntityActions.Reset,
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
