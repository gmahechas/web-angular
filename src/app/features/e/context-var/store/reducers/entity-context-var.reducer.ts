import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ContextVar } from '@web/app/features/e/context-var/models/context-var.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/e/context-var/store/actions/entity-context-var.actions';

export interface State extends EntityState<ContextVar> { }

export const adapter: EntityAdapter<ContextVar> = createEntityAdapter<ContextVar>({
  selectId: (entity: ContextVar) => entity.context_var_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationContextVar.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeContextVar, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateContextVar.context_var_id,
        changes: action.payload.entity.updateContextVar
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyContextVar.context_var_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
