import { createReducer, on } from '@ngrx/store';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';

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
    fromHourRangeActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationHourRange.total,
      perPage: entities.paginationHourRange.per_page,
      currentPage: entities.paginationHourRange.current_page,
      from: entities.paginationHourRange.from,
      to: entities.paginationHourRange.to
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadFailEntity,
    fromHourRangeActions.EntityActions.StoreSuccessEntity,
    fromHourRangeActions.EntityActions.Reset,
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
