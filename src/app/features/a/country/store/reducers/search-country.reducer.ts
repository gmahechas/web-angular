import { createReducer, on } from '@ngrx/store';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';
import { SearchCountry } from '@web/app/features/a/country/models/search-country.model';

export interface State {
  loaded: boolean;
  query: SearchCountry;
}

export const initialState: State = {
  loaded: false,
  query: {
    country: {
      country_id: '',
      country_name: '',
      country_code: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromCountryActions.EntityActions.LoadEntity,
    fromCountryActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        country: search.country
      }
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromCountryActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
