import { createReducer, on } from '@ngrx/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';
import {
  SelectedMacroproject, initialStateSelectedMacroproject
} from '@web/app/features/d/macroproject/models/selected-macroproject.model';

export interface State {
  selected: SelectedMacroproject;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedMacroproject,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromMacroprojectActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadFailEntity,
    fromMacroprojectActions.EntityActions.StoreFailEntity,
    fromMacroprojectActions.EntityActions.UpdateFailEntity,
    fromMacroprojectActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedMacroproject,
      error,
      pending: false
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadEntity,
    fromMacroprojectActions.EntityActions.PaginateEntity,
    fromMacroprojectActions.EntityActions.StoreEntity,
    fromMacroprojectActions.EntityActions.UpdateEntity,
    fromMacroprojectActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadSuccessEntity,
    fromMacroprojectActions.EntityActions.StoreSuccessEntity,
    fromMacroprojectActions.EntityActions.UpdateSuccessEntity,
    fromMacroprojectActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedMacroproject,
      pending: false
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
