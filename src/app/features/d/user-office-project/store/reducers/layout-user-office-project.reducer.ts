import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';
import {
  SelectedUserOfficeProject,
  initialStateSelectedUserOfficeProject
} from '@web/app/features/d/user-office-project/models/selected-user-office-project.model';

export interface State {
  selected: SelectedUserOfficeProject;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedUserOfficeProject,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeProjectActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadFailEntity,
    fromUserOfficeProjectActions.EntityActions.StoreFailEntity,
    fromUserOfficeProjectActions.EntityActions.UpdateFailEntity,
    fromUserOfficeProjectActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedUserOfficeProject,
      error,
      pending: false
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadEntity,
    fromUserOfficeProjectActions.EntityActions.PaginateEntity,
    fromUserOfficeProjectActions.EntityActions.StoreEntity,
    fromUserOfficeProjectActions.EntityActions.UpdateEntity,
    fromUserOfficeProjectActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity,
    fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity,
    fromUserOfficeProjectActions.EntityActions.UpdateSuccessEntity,
    fromUserOfficeProjectActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedUserOfficeProject,
      pending: false
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
