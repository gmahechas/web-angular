import { EntityActionTypes, EntityActions } from '@app/app/two/person/store/actions/entity-person.actions';
import { SearchPerson } from '@app/app/two/person/models/search-person.model';

export interface State {
  loaded: boolean;
  query: SearchPerson;
}

export const initialState: State = {
  loaded: false,
  query: {
    person: {
      person_id: '',
      person_identification: '',
      person_names: ''
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
          person: action.payload.search.person
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
