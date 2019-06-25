import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

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
    fromScheduleDayActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationScheduleDay.total,
      perPage: entities.paginationScheduleDay.per_page,
      currentPage: entities.paginationScheduleDay.current_page,
      from: entities.paginationScheduleDay.from,
      to: entities.paginationScheduleDay.to
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadFailEntity,
    fromScheduleDayActions.EntityActions.StoreSuccessEntity,
    fromScheduleDayActions.EntityActions.Reset,
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
