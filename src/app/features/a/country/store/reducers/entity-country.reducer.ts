import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Country } from '@web/app/features/a/country/models/country.model';
import { EntityActionTypes, EntityActions } from '@web/app/features/a/country/store/actions/entity-country.actions';

export interface State extends EntityState<Country> {
  selected: {
    selectedEntity: Country | null;
  };
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: (entity: Country) => entity.country_id,
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
        action.payload.entities.paginationCountry.data,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.StoreSuccessEntity: {
      const newState = adapter.removeAll(state);
      return adapter.addOne(action.payload.entity.storeCountry, newState);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateCountry.country_id,
        changes: action.payload.entity.updateCountry
      },
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(
        action.payload.entity.destroyCountry.country_id,
        { ...state, selected: { selectedEntity: null } }
      );
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll({ ...state, selected: { selectedEntity: null } });
    }

    case EntityActionTypes.SelectEntity: {
      return {
        ...state,
        selected: { selectedEntity: action.payload.entity }
      };
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
