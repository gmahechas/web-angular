import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { OfficeDepartment } from '@web/app/features/b/office-department/models/office-department.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/b/office-department/store/actions/entity-office-department.actions';

export interface State extends EntityState<OfficeDepartment> { }

export const adapter: EntityAdapter<OfficeDepartment> = createEntityAdapter<OfficeDepartment>({
  selectId: (entity: OfficeDepartment) => entity.office_department_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationOfficeDepartment.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.entity.storeOfficeDepartment, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateOfficeDepartment.office_department_id,
        changes: action.payload.entity.updateOfficeDepartment
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyOfficeDepartment.office_department_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
