import { EntityActionTypes, EntityActions } from '@web/app/features/c/type-person/store/actions/entity-type-person.actions';
import { SearchTypePerson } from '@web/app/features/c/type-person/models/search-type-person.model';

export interface State {
  loaded: boolean;
  query: SearchTypePerson;
}

export const initialState: State = {
  loaded: false,
  query: {
    type_person: {
      type_person_id: '',
      type_person_description: ''
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
