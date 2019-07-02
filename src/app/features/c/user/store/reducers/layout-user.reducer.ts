import { createReducer, on } from '@ngrx/store';
import * as fromUserActions from '@web/app/features/c/user/store/actions';
import { SelectedUser, initialStateSelectedUser } from '@web/app/features/c/user/models/selected-user.model';

export interface State {
  selected: SelectedUser;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedUser,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromUserActions.EntityActions.LoadFailEntity,
    fromUserActions.EntityActions.StoreFailEntity,
    fromUserActions.EntityActions.UpdateFailEntity,
    fromUserActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedUser,
      error,
      pending: false
    })
  ),
  on(
    fromUserActions.EntityActions.LoadEntity,
    fromUserActions.EntityActions.PaginateEntity,
    fromUserActions.EntityActions.StoreEntity,
    fromUserActions.EntityActions.UpdateEntity,
    fromUserActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromUserActions.EntityActions.LoadSuccessEntity,
    fromUserActions.EntityActions.StoreSuccessEntity,
    fromUserActions.EntityActions.UpdateSuccessEntity,
    fromUserActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedUser,
      pending: false
    })
  ),
  on(
    fromUserActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
