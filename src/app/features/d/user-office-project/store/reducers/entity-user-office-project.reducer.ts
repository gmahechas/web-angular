import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/d/user-office-project/store/actions/entity-user-office-project.actions';

export interface State extends EntityState<UserOfficeProject> { }

export const adapter: EntityAdapter<UserOfficeProject> = createEntityAdapter<UserOfficeProject>({
  selectId: (entity: UserOfficeProject) => entity.user_office_project_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationUserOfficeProject.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeUserOfficeProject, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateUserOfficeProject.user_office_project_id,
        changes: action.payload.entity.updateUserOfficeProject
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyUserOfficeProject.user_office_project_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
