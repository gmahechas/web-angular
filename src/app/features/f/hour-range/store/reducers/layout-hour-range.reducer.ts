import { createReducer, on } from '@ngrx/store';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';
import { SelectedHourRange, initialStateSelectedHourRange } from '@web/app/features/f/hour-range/models/selected-hour-range.model';

export interface State {
  selected: SelectedHourRange;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedHourRange,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromHourRangeActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadFailEntity,
    fromHourRangeActions.EntityActions.StoreFailEntity,
    fromHourRangeActions.EntityActions.UpdateFailEntity,
    fromHourRangeActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedHourRange,
      error,
      pending: false
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadEntity,
    fromHourRangeActions.EntityActions.PaginateEntity,
    fromHourRangeActions.EntityActions.StoreEntity,
    fromHourRangeActions.EntityActions.UpdateEntity,
    fromHourRangeActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromHourRangeActions.EntityActions.LoadSuccessEntity,
    fromHourRangeActions.EntityActions.StoreSuccessEntity,
    fromHourRangeActions.EntityActions.UpdateSuccessEntity,
    fromHourRangeActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedHourRange,
      pending: false
    })
  ),
  on(
    fromHourRangeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
