import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from '@web/app/features/d/project/models/project.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/d/project/store/actions/entity-project.actions';

export interface State extends EntityState<Project> {
  selectedEntity: Project | null;
}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({
  selectId: (entity: Project) => entity.project_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedEntity: null,
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationProject.data,
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selectedEntity: null });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeProject, newState);
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selectedEntity: action.payload.entity
      };
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateProject.project_id,
        changes: action.payload.entity.updateProject
      },
        { ...state, selectedEntity: null }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyProject.project_id,
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
