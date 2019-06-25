import { createReducer, on } from '@ngrx/store';
import * as fromCityActions from '@web/app/features/a/city/store/actions';
import { SearchCity } from '@web/app/features/a/city/models/search-city.model';

export interface State {
  loaded: boolean;
  query: SearchCity;
}

export const initialState: State = {
  loaded: false,
  query: {
    city: {
      city_id: '',
      city_name: '',
      city_code: ''
    },
    estate: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromCityActions.EntityActions.LoadEntity,
    fromCityActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        city: search.city,
        estate: search.estate
      }
    })
  ),
  on(
    fromCityActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromCityActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromCityActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
