import { EntityActionTypes, EntityActions } from '@web/app/features/f/hour-range/store/actions/entity-hour-range.actions';
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

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: {
          hour_range: action.payload.search.hour_range
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
