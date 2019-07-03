import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';
import {
  SelectedTypePersonIdentification,
  initialStateSelectedTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/selected-type-person-identification.model';

export interface State {
  selected: SelectedTypePersonIdentification;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedTypePersonIdentification,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonIdentificationActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadFailEntity,
    fromTypePersonIdentificationActions.EntityActions.StoreFailEntity,
    fromTypePersonIdentificationActions.EntityActions.UpdateFailEntity,
    fromTypePersonIdentificationActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedTypePersonIdentification,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadEntity,
    fromTypePersonIdentificationActions.EntityActions.PaginateEntity,
    fromTypePersonIdentificationActions.EntityActions.StoreEntity,
    fromTypePersonIdentificationActions.EntityActions.UpdateEntity,
    fromTypePersonIdentificationActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity,
    fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity,
    fromTypePersonIdentificationActions.EntityActions.UpdateSuccessEntity,
    fromTypePersonIdentificationActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedTypePersonIdentification,
      pending: false
    })
  ),
  on(
    fromTypePersonIdentificationActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
