import { createReducer, on } from '@ngrx/store';
import { EntityActions } from '@web/app/features/a/estate/store/actions';
import { SearchEstate } from '@web/app/features/a/estate/models/search-estate.model';

export interface State {
  loaded: boolean;
  query: SearchEstate;
}

export const initialState: State = {
  loaded: false,
  query: {
    estate: {
      estate_id: '',
      estate_name: '',
      estate_code: ''
    },
    country: null
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
        estate: search.estate,
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
