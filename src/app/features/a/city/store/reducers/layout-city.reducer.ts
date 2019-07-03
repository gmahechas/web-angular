import { createReducer, on } from '@ngrx/store';
import * as fromCityActions from '@web/app/features/a/city/store/actions';
import { SelectedCity, initialStateSelectedCity } from '@web/app/features/a/city/models/selected-city.model';

export interface State {
  selected: SelectedCity;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedCity,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromCityActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromCityActions.EntityActions.LoadFailEntity,
    fromCityActions.EntityActions.StoreFailEntity,
    fromCityActions.EntityActions.UpdateFailEntity,
    fromCityActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedCity,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromCityActions.EntityActions.LoadEntity,
    fromCityActions.EntityActions.PaginateEntity,
    fromCityActions.EntityActions.StoreEntity,
    fromCityActions.EntityActions.UpdateEntity,
    fromCityActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromCityActions.EntityActions.LoadSuccessEntity,
    fromCityActions.EntityActions.StoreSuccessEntity,
    fromCityActions.EntityActions.UpdateSuccessEntity,
    fromCityActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedCity,
      pending: false
    })
  ),
  on(
    fromCityActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
