import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/e/workflow/store/actions/entity-workflow.actions';

export interface State extends EntityState<Workflow> { }

export const adapter: EntityAdapter<Workflow> = createEntityAdapter<Workflow>({
  selectId: (entity: Workflow) => entity.workflow_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationWorkflow.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeWorkflow, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateWorkflow.workflow_id,
        changes: action.payload.entity.updateWorkflow
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyWorkflow.workflow_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
