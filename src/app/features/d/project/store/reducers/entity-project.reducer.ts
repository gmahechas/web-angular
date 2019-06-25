import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';
import { Project } from '@web/app/features/d/project/models/project.model';

export interface State extends EntityState<Project> { }

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>({
  selectId: (entity: Project) => entity.project_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromProjectActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationProject.data, state)
  ),
  on(
    fromProjectActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromProjectActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeProject, newState);
    }
  ),
  on(
    fromProjectActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateProject.project_id, changes: entity.updateProject }, state)
  ),
  on(
    fromProjectActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyProject.project_id, state)
  ),
  on(
    fromProjectActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
