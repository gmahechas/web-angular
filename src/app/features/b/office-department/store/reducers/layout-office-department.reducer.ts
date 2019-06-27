import { createReducer, on } from '@ngrx/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';
import {
  SelectedOfficeDepartment, initialStateSelectedOfficeDepartment
} from '@web/app/features/b/office-department/models/selected-office-department.model';

export interface State {
  selected: SelectedOfficeDepartment;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedOfficeDepartment,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromOfficeDepartmentActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadFailEntity,
    fromOfficeDepartmentActions.EntityActions.StoreFailEntity,
    fromOfficeDepartmentActions.EntityActions.UpdateFailEntity,
    fromOfficeDepartmentActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedOfficeDepartment,
      error,
      pending: false
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadEntity,
    fromOfficeDepartmentActions.EntityActions.PaginateEntity,
    fromOfficeDepartmentActions.EntityActions.StoreEntity,
    fromOfficeDepartmentActions.EntityActions.UpdateEntity,
    fromOfficeDepartmentActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity,
    fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity,
    fromOfficeDepartmentActions.EntityActions.UpdateSuccessEntity,
    fromOfficeDepartmentActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedOfficeDepartment,
      pending: false
    })
  ),
  on(
    fromOfficeDepartmentActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
