import { createReducer, on } from '@ngrx/store';
import * as fromEstateActions from '@web/app/features/a/estate/store/actions';
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
    fromEstateActions.EntityActions.LoadEntity,
    fromEstateActions.EntityActions.LoadEntityShared,
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
    fromEstateActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromEstateActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromEstateActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
