import { createReducer, on } from '@ngrx/store';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';
import { SelectedSchedule, initialStateSelectedSchedule } from '@web/app/features/f/schedule/models/selected-schedule.model';

export interface State {
  selected: SelectedSchedule;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedSchedule,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadFailEntity,
    fromScheduleActions.EntityActions.StoreFailEntity,
    fromScheduleActions.EntityActions.UpdateFailEntity,
    fromScheduleActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedSchedule,
      error,
      pending: false
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadEntity,
    fromScheduleActions.EntityActions.PaginateEntity,
    fromScheduleActions.EntityActions.StoreEntity,
    fromScheduleActions.EntityActions.UpdateEntity,
    fromScheduleActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromScheduleActions.EntityActions.LoadSuccessEntity,
    fromScheduleActions.EntityActions.StoreSuccessEntity,
    fromScheduleActions.EntityActions.UpdateSuccessEntity,
    fromScheduleActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedSchedule,
      pending: false
    })
  ),
  on(
    fromScheduleActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
