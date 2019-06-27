import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';
import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';

export interface State extends EntityState<OfficeDepartment> { }

export const adapter: EntityAdapter<OfficeDepartment> = createEntityAdapter<OfficeDepartment>({
  selectId: (entity: OfficeDepartment) => entity.office_department_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationOfficeDepartment.data, state)
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeOfficeDepartment, newState);
    }
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({
      id: entity.updateOfficeDepartment.office_department_id, changes: entity.updateOfficeDepartment
    }, state)
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyOfficeDepartment.office_department_id, state)
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
