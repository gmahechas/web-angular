import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Context } from '@web/app/features/e/context/models/context.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/e/context/store/actions/entity-context.actions';

export interface State extends EntityState<Context> { }

export const adapter: EntityAdapter<Context> = createEntityAdapter<Context>({
  selectId: (entity: Context) => entity.context_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationContext.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeContext, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateContext.context_id,
        changes: action.payload.entity.updateContext
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyContext.context_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
