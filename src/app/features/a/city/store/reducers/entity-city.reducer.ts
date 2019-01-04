import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { City } from '@web/app/features/a/city/models/city.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/a/city/store/actions/entity-city.actions';

export interface State extends EntityState<City> {
  selected: {
    selectedEntity: City | null;
  };
}

export const adapter: EntityAdapter<City> = createEntityAdapter<City>({
  selectId: (entity: City) => entity.city_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selected: {
    selectedEntity: null
  }
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(
        action.payload.entities.paginationCity.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeCity, newState);
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selected: { selectedEntity: action.payload.entity }
      };
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateCity.city_id,
        changes: action.payload.entity.updateCity
      },
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyCity.city_id,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
