import { createReducer, on } from '@ngrx/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';
import { SelectedProfileMenu, initialStateSelectedProfileMenu } from '@web/app/features/c/profile-menu/models/selected-profile-menu.model';

export interface State {
  selected: SelectedProfileMenu;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedProfileMenu,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromProfileMenuActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadFailEntity,
    fromProfileMenuActions.EntityActions.StoreFailEntity,
    fromProfileMenuActions.EntityActions.UpdateFailEntity,
    fromProfileMenuActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedProfileMenu,
      error,
      pending: false
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadEntity,
    fromProfileMenuActions.EntityActions.PaginateEntity,
    fromProfileMenuActions.EntityActions.StoreEntity,
    fromProfileMenuActions.EntityActions.UpdateEntity,
    fromProfileMenuActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.LoadSuccessEntity,
    fromProfileMenuActions.EntityActions.StoreSuccessEntity,
    fromProfileMenuActions.EntityActions.UpdateSuccessEntity,
    fromProfileMenuActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedProfileMenu,
      pending: false
    })
  ),
  on(
    fromProfileMenuActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
