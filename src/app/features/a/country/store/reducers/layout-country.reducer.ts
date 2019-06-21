import { createReducer, on } from '@ngrx/store';
import { EntityActions } from '@web/app/features/a/country/store/actions';
import { SelectedCountry, initialStateSelectedCountry } from '@web/app/features/a/country/models/selected-country.model';

export interface State {
  selected: SelectedCountry;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedCountry,
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
      selected: initialStateSelectedCountry,
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
      selected: initialStateSelectedCountry,
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
