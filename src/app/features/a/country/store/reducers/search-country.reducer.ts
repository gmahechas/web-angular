import { createReducer, on } from '@ngrx/store';
import { EntityActions } from '@web/app/features/a/country/store/actions';
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
    EntityActions.LoadEntity,
    EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        country: search.country
      }
    })
  ),
  on(
    EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
