import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Office } from '@web/app/features/b/office/models/office.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/b/office/store/actions/entity-office.actions';

export interface State extends EntityState<Office> { }

export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (entity: Office) => entity.office_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationOffice.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeOffice, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateOffice.office_id,
        changes: action.payload.entity.updateOffice
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyOffice.office_id, state);
    }

    case EntityActionTypes.Reset: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
