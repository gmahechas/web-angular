import { createReducer, on } from '@ngrx/store';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';
import { SelectedOffice, initialStateSelectedOffice } from '@web/app/features/b/office/models/selected-office.model';

export interface State {
  selected: SelectedOffice;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedOffice,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromOfficeActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadFailEntity,
    fromOfficeActions.EntityActions.StoreFailEntity,
    fromOfficeActions.EntityActions.UpdateFailEntity,
    fromOfficeActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedOffice,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadEntity,
    fromOfficeActions.EntityActions.PaginateEntity,
    fromOfficeActions.EntityActions.StoreEntity,
    fromOfficeActions.EntityActions.UpdateEntity,
    fromOfficeActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadSuccessEntity,
    fromOfficeActions.EntityActions.StoreSuccessEntity,
    fromOfficeActions.EntityActions.UpdateSuccessEntity,
    fromOfficeActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedOffice,
      pending: false
    })
  ),
  on(
    fromOfficeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
