import { createReducer, on } from '@ngrx/store';
import * as fromEstateActions from '@web/app/features/a/estate/store/actions';
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
    fromEstateActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromEstateActions.EntityActions.LoadFailEntity,
    fromEstateActions.EntityActions.StoreFailEntity,
    fromEstateActions.EntityActions.UpdateFailEntity,
    fromEstateActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedEstate,
      error,
      pending: false
    })
  ),
  on(
    fromEstateActions.EntityActions.LoadEntity,
    fromEstateActions.EntityActions.PaginateEntity,
    fromEstateActions.EntityActions.StoreEntity,
    fromEstateActions.EntityActions.UpdateEntity,
    fromEstateActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromEstateActions.EntityActions.LoadSuccessEntity,
    fromEstateActions.EntityActions.StoreSuccessEntity,
    fromEstateActions.EntityActions.UpdateSuccessEntity,
    fromEstateActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedEstate,
      pending: false
    })
  ),
  on(
    fromEstateActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
