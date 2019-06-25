import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';
import { SearchScheduleDay } from '@web/app/features/f/schedule-day/models/search-schedule-day.model';

export interface State {
  loaded: boolean;
  query: SearchScheduleDay;
}

export const initialState: State = {
  loaded: false,
  query: {
    schedule_day: {
      schedule_day_id: ''
      // TODO:
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayActions.EntityActions.LoadEntity,
    fromScheduleDayActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        schedule_day: search.schedule_day, // TODO:
      }
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
