import { createReducer, on } from '@ngrx/store';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';
import { SearchSchedule } from '@web/app/features/f/schedule/models/search-schedule.model';

export interface State {
  loaded: boolean;
  query: SearchSchedule;
}

export const initialState: State = {
  loaded: false,
  query: {
    schedule: {
      schedule_id: '',
      schedule_name: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleActions.EntityActions.LoadEntity,
    fromScheduleActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        schedule: search.schedule
      }
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromScheduleActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
