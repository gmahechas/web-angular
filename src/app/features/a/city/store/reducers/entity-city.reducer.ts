import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromCityActions from '@web/app/features/a/city/store/actions';
import { City } from '@web/app/features/a/city/models/city.model';

export interface State extends EntityState<City> { }

export const adapter: EntityAdapter<City> = createEntityAdapter<City>({
  selectId: (entity: City) => entity.city_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromCityActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationCity.data, state)
  ),
  on(
    fromCityActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromCityActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeCity, newState);
    }
  ),
  on(
    fromCityActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateCity.city_id, changes: entity.updateCity }, state)
  ),
  on(
    fromCityActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyCity.city_id, state)
  ),
  on(
    fromCityActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
