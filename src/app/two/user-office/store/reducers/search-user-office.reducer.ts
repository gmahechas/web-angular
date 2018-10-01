import { EntityActionTypes, EntityActions } from '../actions/entity-user-office.actions';
import { SearchUserOffice } from '../../models/search-user-office.model';

export interface State {
  loaded: boolean;
  query: SearchUserOffice;
}

const initialState: State = {
  loaded: false,
  query: {
    user_office: {
      user_office_id: '',
      user_office_status: ''
    },
    user: {
      user_id: ''
    },
    office: {
      office_id: ''
    }
  }
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity: {
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

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
