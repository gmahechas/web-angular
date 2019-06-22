import { createReducer, on } from '@ngrx/store';
import { EntityActions } from '@web/app/features/a/estate/store/actions';
import { SelectedEstate, initialStateSelectedEstate } from '@web/app/features/a/estate/models/selected-estate.model';

export interface State {
  selected: SelectedEstate;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedEstate,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    EntityActions.LoadFailEntity,
    EntityActions.StoreFailEntity,
    EntityActions.UpdateFailEntity,
    EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedEstate,
      error,
      pending: false
    })
  ),
  on(
    EntityActions.LoadEntity,
    EntityActions.PaginateEntity,
    EntityActions.StoreEntity,
    EntityActions.UpdateEntity,
    EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    EntityActions.LoadSuccessEntity,
    EntityActions.StoreSuccessEntity,
    EntityActions.UpdateSuccessEntity,
    EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedEstate,
      pending: false
    })
  ),
  on(
    EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
