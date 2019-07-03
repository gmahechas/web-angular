import { createReducer, on } from '@ngrx/store';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';
import { SelectedProject, initialStateSelectedProject } from '@web/app/features/d/project/models/selected-project.model';

export interface State {
  selected: SelectedProject;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedProject,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromProjectActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadFailEntity,
    fromProjectActions.EntityActions.StoreFailEntity,
    fromProjectActions.EntityActions.UpdateFailEntity,
    fromProjectActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedProject,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadEntity,
    fromProjectActions.EntityActions.PaginateEntity,
    fromProjectActions.EntityActions.StoreEntity,
    fromProjectActions.EntityActions.UpdateEntity,
    fromProjectActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadSuccessEntity,
    fromProjectActions.EntityActions.StoreSuccessEntity,
    fromProjectActions.EntityActions.UpdateSuccessEntity,
    fromProjectActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedProject,
      pending: false
    })
  ),
  on(
    fromProjectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
