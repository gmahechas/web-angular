import { createReducer, on } from '@ngrx/store';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';

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
    fromScheduleActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationSchedule.total,
      perPage: entities.paginationSchedule.per_page,
      currentPage: entities.paginationSchedule.current_page,
      from: entities.paginationSchedule.from,
      to: entities.paginationSchedule.to
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadFailEntity,
    fromScheduleActions.EntityActions.StoreSuccessEntity,
    fromScheduleActions.EntityActions.Reset,
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
