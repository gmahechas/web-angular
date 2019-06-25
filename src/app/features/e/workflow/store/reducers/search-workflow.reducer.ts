import { createReducer, on } from '@ngrx/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';
import { SearchWorkflow } from '@web/app/features/e/workflow/models/search-workflow.model';

export interface State {
  loaded: boolean;
  query: SearchWorkflow;
}

export const initialState: State = {
  loaded: false,
  query: {
    workflow: {
      workflow_id: '',
      workflow_name: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromWorkflowActions.EntityActions.LoadEntity,
    fromWorkflowActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        workflow: search.workflow
      }
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromWorkflowActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromWorkflowActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
