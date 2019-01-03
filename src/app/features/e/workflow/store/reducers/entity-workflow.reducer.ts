import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Workflow } from '@web/app/features/e/workflow/models/workflow.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/e/workflow/store/actions/entity-workflow.actions';

export interface State extends EntityState<Workflow> {
  selectedEntity: Workflow | null;
}

export const adapter: EntityAdapter<Workflow> = createEntityAdapter<Workflow>({
  selectId: (entity: Workflow) => entity.workflow_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedEntity: null,
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationWorkflow.data,
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selectedEntity: null });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeWorkflow, newState);
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selectedEntity: action.payload.entity
      };
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateWorkflow.workflow_id,
        changes: action.payload.entity.updateWorkflow
      },
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyWorkflow.workflow_id,
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selectedEntity: null });
    }

    default:
      return state;
  }

}

export const getSelectedEntity = (state: State) => state.selectedEntity;
