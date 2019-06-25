import { createReducer, on } from '@ngrx/store';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';

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
    fromProfileActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationProfile.total,
      perPage: entities.paginationProfile.per_page,
      currentPage: entities.paginationProfile.current_page,
      from: entities.paginationProfile.from,
      to: entities.paginationProfile.to
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadFailEntity,
    fromProfileActions.EntityActions.StoreSuccessEntity,
    fromProfileActions.EntityActions.Reset,
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
