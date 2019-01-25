import { EntityActionTypes, EntityActions } from '@web/app/features/f/schedule/store/actions/entity-schedule.actions';
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

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: {
          schedule: action.payload.search.schedule
        }
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

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
