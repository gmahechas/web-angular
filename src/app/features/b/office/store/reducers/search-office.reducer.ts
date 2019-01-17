import { EntityActionTypes, EntityActions } from '@web/app/features/b/office/store/actions/entity-office.actions';
import { SearchOffice } from '@web/app/features/b/office/models/search-office.model';

export interface State {
  loaded: boolean;
  query: SearchOffice;
}

export const initialState: State = {
  loaded: false,
  query: {
    office: {
      office_id: '',
      office_name: ''
    },
    city: null
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

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
