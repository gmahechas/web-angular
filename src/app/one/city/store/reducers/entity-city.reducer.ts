import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { City } from './../../models/city.model';
import { EntityActionTypes, EntityActions } from '../actions/entity-city.actions';

export interface State extends EntityState<City> {

}

export const adapter: EntityAdapter<City> = createEntityAdapter<City>({
  selectId: (entity: City) => entity.city_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadSuccessEntity: {
      return adapter.addAll(action.payload.entities.paginationCity.data, state);
    }

    case EntityActionTypes.LoadFailEntity: {
      return adapter.removeAll(state);
    }

    case EntityActionTypes.StoreSuccessEntity: {
      return adapter.addOne(action.payload.entity.storeCity, state);
    }

    case EntityActionTypes.UpdateSuccessEntity: {
      return adapter.updateOne({
        id: action.payload.entity.updateCity.city_id,
        changes: action.payload.entity.updateCity
      },
        state
      );
    }

    case EntityActionTypes.DestroySuccessEntity: {
      return adapter.removeOne(action.payload.entity.destroyCity.city_id, state);
    }

    case EntityActionTypes.ResetSearch: {
      return adapter.removeAll(state);
    }

    default:
      return state;
  }

}
