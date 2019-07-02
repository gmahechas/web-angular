import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';

export interface State extends EntityState<UserOfficeProject> { }

export const adapter: EntityAdapter<UserOfficeProject> = createEntityAdapter<UserOfficeProject>({
  selectId: (entity: UserOfficeProject) => entity.user_office_project_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationUserOfficeProject.data, state)
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      /* const newState = adapter.removeAll(state); */
      return adapter.addOne(entity.storeUserOfficeProject, state);
    }
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({
      id: entity.updateUserOfficeProject.user_office_project_id, changes: entity.updateUserOfficeProject
    }, state)
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyUserOfficeProject.user_office_project_id, state)
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
