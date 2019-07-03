import { createReducer, on } from '@ngrx/store';
import * as fromDayActions from '@web/app/features/f/day/store/actions';
import { SelectedDay, initialStateSelectedDay } from '@web/app/features/f/day/models/selected-day.model';

export interface State {
  selected: SelectedDay;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedDay,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromDayActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromDayActions.EntityActions.LoadFailEntity,
    fromDayActions.EntityActions.StoreFailEntity,
    fromDayActions.EntityActions.UpdateFailEntity,
    fromDayActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedDay,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromDayActions.EntityActions.LoadEntity,
    fromDayActions.EntityActions.PaginateEntity,
    fromDayActions.EntityActions.StoreEntity,
    fromDayActions.EntityActions.UpdateEntity,
    fromDayActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromDayActions.EntityActions.LoadSuccessEntity,
    fromDayActions.EntityActions.StoreSuccessEntity,
    fromDayActions.EntityActions.UpdateSuccessEntity,
    fromDayActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedDay,
      pending: false
    })
  ),
  on(
    fromDayActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
