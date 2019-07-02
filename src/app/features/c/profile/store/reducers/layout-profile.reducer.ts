import { createReducer, on } from '@ngrx/store';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';
import { SelectedProfile, initialStateSelectedProfile } from '@web/app/features/c/profile/models/selected-profile.model';

export interface State {
  selected: SelectedProfile;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedProfile,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromProfileActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadFailEntity,
    fromProfileActions.EntityActions.StoreFailEntity,
    fromProfileActions.EntityActions.UpdateFailEntity,
    fromProfileActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedProfile,
      error,
      pending: false
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadEntity,
    fromProfileActions.EntityActions.PaginateEntity,
    fromProfileActions.EntityActions.StoreEntity,
    fromProfileActions.EntityActions.UpdateEntity,
    fromProfileActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromProfileActions.EntityActions.LoadSuccessEntity,
    fromProfileActions.EntityActions.StoreSuccessEntity,
    fromProfileActions.EntityActions.UpdateSuccessEntity,
    fromProfileActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedProfile,
      pending: false
    })
  ),
  on(
    fromProfileActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
