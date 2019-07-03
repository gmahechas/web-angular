import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';
import { SearchScheduleDayHourRange } from '@web/app/features/f/schedule-day-hour-range/models/search-schedule-day-hour-range.model';

export interface State {
  loaded: boolean;
  query: SearchScheduleDayHourRange;
}

export const initialState: State = {
  loaded: false,
  query: {
    schedule_day_hour_range: {
      schedule_day_hour_range_id: '',
      schedule_day_hour_range_status: null
    },
    schedule_day: null,
    hour_range: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadEntity,
    fromScheduleDayHourRangeActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        schedule_day_hour_range: search.schedule_day_hour_range,
        schedule_day: search.schedule_day,
        hour_range: search.hour_range
      }
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
