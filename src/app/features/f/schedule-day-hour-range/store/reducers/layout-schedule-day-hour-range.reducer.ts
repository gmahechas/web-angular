import { createReducer, on } from '@ngrx/store';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';
import {
  SelectedScheduleDayHourRange, initialStateSelectedScheduleDayHourRange
} from '@web/app/features/f/schedule-day-hour-range/models/selected-schedule-day-hour-range.model';

export interface State {
  selected: SelectedScheduleDayHourRange;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedScheduleDayHourRange,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromScheduleDayHourRangeActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity,
    fromScheduleDayHourRangeActions.EntityActions.StoreFailEntity,
    fromScheduleDayHourRangeActions.EntityActions.UpdateFailEntity,
    fromScheduleDayHourRangeActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedScheduleDayHourRange,
      error,
      pending: false
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadEntity,
    fromScheduleDayHourRangeActions.EntityActions.PaginateEntity,
    fromScheduleDayHourRangeActions.EntityActions.StoreEntity,
    fromScheduleDayHourRangeActions.EntityActions.UpdateEntity,
    fromScheduleDayHourRangeActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity,
    fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity,
    fromScheduleDayHourRangeActions.EntityActions.UpdateSuccessEntity,
    fromScheduleDayHourRangeActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedScheduleDayHourRange,
      pending: false
    })
  ),
  on(
    fromScheduleDayHourRangeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
