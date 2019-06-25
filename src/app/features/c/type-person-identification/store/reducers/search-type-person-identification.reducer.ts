import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';
import {
  SearchTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/search-type-person-identification.model';

export interface State {
  loaded: boolean;
  query: SearchTypePersonIdentification;
}

export const initialState: State = {
  loaded: false,
  query: {
    type_person_identification: {
      type_person_identification_id: '',
      type_person_identification_description: ''
    }
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadEntity,
    fromTypePersonIdentificationActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        type_person_identification: search.type_person_identification
      }
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
