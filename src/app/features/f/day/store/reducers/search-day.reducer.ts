import { createReducer, on } from '@ngrx/store';
import * as fromDayActions from '@web/app/features/f/day/store/actions';
import { SearchDay } from '@web/app/features/f/day/models/search-day.model';

export interface State {
  loaded: boolean;
  query: SearchDay;
}

export const initialState: State = {
  loaded: false,
  query: {
    day: {
      day_id: '',
      day_name: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromDayActions.EntityActions.LoadEntity,
    fromDayActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        day: search.day
      }
    })
  ),
  on(
    fromDayActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromDayActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromDayActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
