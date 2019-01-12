import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Department } from '@web/app/features/b/department/models/department.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/b/department/store/actions/entity-department.actions';

export interface State extends EntityState<Department> { }

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>({
  selectId: (entity: Department) => entity.department_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationDepartment.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeDepartment, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateDepartment.department_id,
        changes: action.payload.entity.updateDepartment
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyDepartment.department_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
