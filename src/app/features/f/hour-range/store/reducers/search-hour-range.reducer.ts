import { createReducer, on } from '@ngrx/store';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';
import { SearchHourRange } from '@web/app/features/f/hour-range/models/search-hour-range.model';

export interface State {
  loaded: boolean;
  query: SearchHourRange;
}

export const initialState: State = {
  loaded: false,
  query: {
    hour_range: {
      hour_range_id: '',
      hour_range_name: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromHourRangeActions.EntityActions.LoadEntity,
    fromHourRangeActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        hour_range: search.hour_range
      }
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromHourRangeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
