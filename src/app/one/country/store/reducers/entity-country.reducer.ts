import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Country } from './../../models/country.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-country.actions';

export interface State extends EntityState<Country> {

}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: (entity: Country) => entity.country_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.paginationCountry.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.storeCountry, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.updateCountry.country_id,
        changes: action.payload.updateCountry
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.destroyCountry.country_id, state);
    }

    default:
      return state;
  }

}
