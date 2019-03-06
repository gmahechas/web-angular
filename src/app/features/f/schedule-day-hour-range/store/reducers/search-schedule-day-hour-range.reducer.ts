import {
  EntityActionTypes, EntityActions
} from '@web/app/features/f/schedule-day-hour-range/store/actions/entity-schedule-day-hour-range.actions';
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

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: { ...state.query, ...action.payload.search }
      };
    }

    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
        loaded: true
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return {
        ...state,
        loaded: false
      };
    }

    case EntityActionTypes.Reset: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
