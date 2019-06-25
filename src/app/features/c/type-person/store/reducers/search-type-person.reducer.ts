import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';
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

export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonActions.EntityActions.LoadEntity,
    fromTypePersonActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        type_person: search.type_person
      }
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromTypePersonActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
