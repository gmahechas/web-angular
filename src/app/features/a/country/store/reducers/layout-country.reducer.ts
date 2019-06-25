import { createReducer, on } from '@ngrx/store';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';
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
    fromCountryActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadFailEntity,
    fromCountryActions.EntityActions.StoreFailEntity,
    fromCountryActions.EntityActions.UpdateFailEntity,
    fromCountryActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedCountry,
      error,
      pending: false
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadEntity,
    fromCountryActions.EntityActions.PaginateEntity,
    fromCountryActions.EntityActions.StoreEntity,
    fromCountryActions.EntityActions.UpdateEntity,
    fromCountryActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromCountryActions.EntityActions.LoadSuccessEntity,
    fromCountryActions.EntityActions.StoreSuccessEntity,
    fromCountryActions.EntityActions.UpdateSuccessEntity,
    fromCountryActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedCountry,
      pending: false
    })
  ),
  on(
    fromCountryActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
