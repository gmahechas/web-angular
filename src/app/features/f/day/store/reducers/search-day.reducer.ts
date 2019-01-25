import { EntityActionTypes, EntityActions } from '@web/app/features/f/day/store/actions/entity-day.actions';
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

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntityShared: {
      return {
        ...state,
        loaded: false,
        query: {
          day: action.payload.search.day
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
