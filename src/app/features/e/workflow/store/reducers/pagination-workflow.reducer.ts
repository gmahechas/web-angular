import { createReducer, on } from '@ngrx/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

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
    fromWorkflowActions.EntityActions.LoadEntity,
    (state) => ({
      ...initialState
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => ({
      ...state,
      total: entities.paginationWorkflow.total,
      perPage: entities.paginationWorkflow.per_page,
      currentPage: entities.paginationWorkflow.current_page,
      from: entities.paginationWorkflow.from,
      to: entities.paginationWorkflow.to
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadFailEntity,
    fromWorkflowActions.EntityActions.StoreSuccessEntity,
    fromWorkflowActions.EntityActions.Reset,
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
