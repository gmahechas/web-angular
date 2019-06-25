import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';
import { Department } from '@web/app/features/b/department/models/department.model';

export interface State extends EntityState<Department> { }

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: (entity: Department) => entity.department_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromDepartmentActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationDepartment.data, state)
  ),
  on(
    fromDepartmentActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromDepartmentActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeDepartment, newState);
    }
  ),
  on(
    fromDepartmentActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateDepartment.department_id, changes: entity.updateDepartment }, state)
  ),
  on(
    fromDepartmentActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyDepartment.department_id, state)
  ),
  on(
    fromDepartmentActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
