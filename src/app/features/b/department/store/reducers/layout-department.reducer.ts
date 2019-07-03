import { createReducer, on } from '@ngrx/store';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';
import { SelectedDepartment, initialStateSelectedDepartment } from '@web/app/features/b/department/models/selected-department.model';

export interface State {
  selected: SelectedDepartment;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedDepartment,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromDepartmentActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadFailEntity,
    fromDepartmentActions.EntityActions.StoreFailEntity,
    fromDepartmentActions.EntityActions.UpdateFailEntity,
    fromDepartmentActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedDepartment,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadEntity,
    fromDepartmentActions.EntityActions.PaginateEntity,
    fromDepartmentActions.EntityActions.StoreEntity,
    fromDepartmentActions.EntityActions.UpdateEntity,
    fromDepartmentActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromDepartmentActions.EntityActions.LoadSuccessEntity,
    fromDepartmentActions.EntityActions.StoreSuccessEntity,
    fromDepartmentActions.EntityActions.UpdateSuccessEntity,
    fromDepartmentActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedDepartment,
      pending: false
    })
  ),
  on(
    fromDepartmentActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
