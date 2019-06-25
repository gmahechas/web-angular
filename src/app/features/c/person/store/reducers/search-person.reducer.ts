import { createReducer, on } from '@ngrx/store';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';
import { SearchPerson } from '@web/app/features/c/person/models/search-person.model';

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

export const reducer = createReducer(
  initialState,
  on(
    fromPersonActions.EntityActions.LoadEntity,
    fromPersonActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        person: search.person
      }
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromPersonActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
