import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Project } from './../../models/project.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-project.actions';

export interface State extends EntityState<Project> {

}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({
  selectId: (entity: Project) => entity.project_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationProject.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeProject, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateProject.project_id,
        changes: action.payload.updateProject
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyProject.project_id, state);
    }

    default:
      return state;
  }

}