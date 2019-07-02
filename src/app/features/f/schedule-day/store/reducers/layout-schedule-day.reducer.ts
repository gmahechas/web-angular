import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';
import { SelectedScheduleDay, initialStateSelectedScheduleDay } from '@web/app/features/f/schedule-day/models/selected-schedule-day.model';

export interface State {
  selected: SelectedScheduleDay;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedScheduleDay,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadFailEntity,
    fromScheduleDayActions.EntityActions.StoreFailEntity,
    fromScheduleDayActions.EntityActions.UpdateFailEntity,
    fromScheduleDayActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedScheduleDay,
      error,
      pending: false
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadEntity,
    fromScheduleDayActions.EntityActions.PaginateEntity,
    fromScheduleDayActions.EntityActions.StoreEntity,
    fromScheduleDayActions.EntityActions.UpdateEntity,
    fromScheduleDayActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.LoadSuccessEntity,
    fromScheduleDayActions.EntityActions.StoreSuccessEntity,
    fromScheduleDayActions.EntityActions.UpdateSuccessEntity,
    fromScheduleDayActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedScheduleDay,
      pending: false
    })
  ),
  on(
    fromScheduleDayActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
