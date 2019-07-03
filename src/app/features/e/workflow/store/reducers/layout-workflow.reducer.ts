import { createReducer, on } from '@ngrx/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';
import { SelectedWorkflow, initialStateSelectedWorkflow } from '@web/app/features/e/workflow/models/selected-workflow.model';

export interface State {
  selected: SelectedWorkflow;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedWorkflow,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromWorkflowActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadFailEntity,
    fromWorkflowActions.EntityActions.StoreFailEntity,
    fromWorkflowActions.EntityActions.UpdateFailEntity,
    fromWorkflowActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedWorkflow,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadEntity,
    fromWorkflowActions.EntityActions.PaginateEntity,
    fromWorkflowActions.EntityActions.StoreEntity,
    fromWorkflowActions.EntityActions.UpdateEntity,
    fromWorkflowActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadSuccessEntity,
    fromWorkflowActions.EntityActions.StoreSuccessEntity,
    fromWorkflowActions.EntityActions.UpdateSuccessEntity,
    fromWorkflowActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedWorkflow,
      pending: false
    })
  ),
  on(
    fromWorkflowActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
