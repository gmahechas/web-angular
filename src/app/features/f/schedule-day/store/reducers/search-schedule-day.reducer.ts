import { EntityActionTypes, EntityActions } from '@web/app/features/f/schedule-day/store/actions/entity-schedule-day.actions';
import { SearchScheduleDay } from '@web/app/features/f/schedule-day/models/search-schedule-day.model';

export interface State {
  loaded: boolean;
  query: SearchScheduleDay;
}

export const initialState: State = {
  loaded: false,
  query: {
    schedule_day: {
      schedule_day_id: '',
      schedule_day_status: null
    },
    schedule: null,
    day: null
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: { schedule_day: action.payload.search.schedule_day }
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
