import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';
import { Country } from '@web/app/features/a/country/models/country.model';

export interface State extends EntityState<Country> { }

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: (entity: Country) => entity.country_id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(
    fromCountryActions.EntityActions.LoadSuccessEntity,
    (state, { entities }) => adapter.addAll(entities.paginationCountry.data, state)
  ),
  on(
    fromCountryActions.EntityActions.LoadFailEntity,
    (state, { error }) => adapter.removeAll(state)
  ),
  on(
    fromCountryActions.EntityActions.StoreSuccessEntity,
    (state, { entity }) => {
      const newState = adapter.removeAll(state);
      return adapter.addOne(entity.storeCountry, newState);
    }
  ),
  on(
    fromCountryActions.EntityActions.UpdateSuccessEntity,
    (state, { entity }) => adapter.updateOne({ id: entity.updateCountry.country_id, changes: entity.updateCountry }, state)
  ),
  on(
    fromCountryActions.EntityActions.DestroySuccessEntity,
    (state, { entity }) => adapter.removeOne(entity.destroyCountry.country_id, state)
  ),
  on(
    fromCountryActions.EntityActions.Reset,
    (state, { redirect }) => adapter.removeAll(state)
  ),
);
