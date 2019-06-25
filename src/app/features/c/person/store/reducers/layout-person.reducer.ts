import { createReducer, on } from '@ngrx/store';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';
import { SelectedPerson, initialStateSelectedPerson } from '@web/app/features/c/person/models/selected-person.model';

export interface State {
  selected: SelectedPerson;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedPerson,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromPersonActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadFailEntity,
    fromPersonActions.EntityActions.StoreFailEntity,
    fromPersonActions.EntityActions.UpdateFailEntity,
    fromPersonActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedPerson,
      error,
      pending: false
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadEntity,
    fromPersonActions.EntityActions.PaginateEntity,
    fromPersonActions.EntityActions.StoreEntity,
    fromPersonActions.EntityActions.UpdateEntity,
    fromPersonActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromPersonActions.EntityActions.LoadSuccessEntity,
    fromPersonActions.EntityActions.StoreSuccessEntity,
    fromPersonActions.EntityActions.UpdateSuccessEntity,
    fromPersonActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedPerson,
      pending: false
    })
  ),
  on(
    fromPersonActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
