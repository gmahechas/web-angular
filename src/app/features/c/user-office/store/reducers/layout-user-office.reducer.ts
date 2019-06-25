import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';
import { SelectedUserOffice, initialStateSelectedUserOffice } from '@web/app/features/c/user-office/models/selected-user-office.model';

export interface State {
  selected: SelectedUserOffice;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedUserOffice,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadFailEntity,
    fromUserOfficeActions.EntityActions.StoreFailEntity,
    fromUserOfficeActions.EntityActions.UpdateFailEntity,
    fromUserOfficeActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedUserOffice,
      error,
      pending: false
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadEntity,
    fromUserOfficeActions.EntityActions.PaginateEntity,
    fromUserOfficeActions.EntityActions.StoreEntity,
    fromUserOfficeActions.EntityActions.UpdateEntity,
    fromUserOfficeActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadSuccessEntity,
    fromUserOfficeActions.EntityActions.StoreSuccessEntity,
    fromUserOfficeActions.EntityActions.UpdateSuccessEntity,
    fromUserOfficeActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedUserOffice,
      pending: false
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
