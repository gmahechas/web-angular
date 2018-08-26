import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Office } from './../../models/office.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-office.actions';

export interface State extends EntityState<Office> {

}

export const adapter: EntityAdapter<Office> = createEntityAdapter<Office>({
  selectId: (entity: Office) => entity.office_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationOffice.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeOffice, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateOffice.office_id,
        changes: action.payload.updateOffice
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyOffice.office_id, state);
    }

    default:
      return state;
  }

}