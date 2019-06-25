import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';

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
    fromScheduleDayHourRangeActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationScheduleDayHourRange.total,
      perPage: entities.paginationScheduleDayHourRange.per_page,
      currentPage: entities.paginationScheduleDayHourRange.current_page,
      from: entities.paginationScheduleDayHourRange.from,
      to: entities.paginationScheduleDayHourRange.to
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity,
    fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity,
    fromScheduleDayHourRangeActions.EntityActions.Reset,
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
