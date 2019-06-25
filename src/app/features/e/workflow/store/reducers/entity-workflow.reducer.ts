import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';
import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';

export interface State extends EntityState<Workflow> { }

export const adapter: EntityAdapter<Workflow> = createEntityAdapter<Workflow>({
  selectId: (entity: Workflow) => entity.workflow_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromWorkflowActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationWorkflow.data, state)
  ),
  on(
    fromWorkflowActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromWorkflowActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeWorkflow, newState);
    }
  ),
  on(
    fromWorkflowActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateWorkflow.workflow_id, changes: entity.updateWorkflow }, state)
  ),
  on(
    fromWorkflowActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyWorkflow.workflow_id, state)
  ),
  on(
    fromWorkflowActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
