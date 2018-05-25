import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Country } from './../../models/country.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-country.actions';

export interface State extends EntityState<Country> {
  selectedId: string | null;
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: (entity: Country) => entity.country_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  selectedId: null
});

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.EntityLoadSuccess: {
      return adapter.addAll(action.payload.paginationCountry['data'], {
        ...state,
        selectedId: state.selectedId
      });
    }

    case EntityActionTypes.EntitySelect: {
      return {
        ...state,
        selectedId: action.payload
      };
    }

    case EntityActionTypes.EntityUnselect: {
      return {
        ...state,
        selectedId: null
      };
    }


    case EntityActionTypes.EntityStoreSuccess: {
      return {
        ...adapter.addOne(action.payload.storeCountry, state)
      };
    }

    case EntityActionTypes.EntityStoreFail: {
      return {
        ...state
      };
    }


    case EntityActionTypes.EntityUpdateSuccess: {
      return {
        ...adapter.updateOne(
          {
            id: action.payload.updateCountry.country_id,
            changes: action.payload.updateCountry
          },
          state
        ),
        selectedId: null
      };
    }

    case EntityActionTypes.EntityUpdateFail: {
      return {
        ...state
      };
    }

    case EntityActionTypes.EntityDestroySuccess: {
      return {
        ...adapter.removeOne(action.payload.destroyCountry.country_id, state),
        selectedId: null
      };
    }

    case EntityActionTypes.EntityDestroyFail: {
      return {
        ...state
      };
    }

    default:
      return state;
  }

}

export const getSelectedId = (state: State) => state.selectedId;
