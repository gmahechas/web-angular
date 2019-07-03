import { createReducer, on } from '@ngrx/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';
import { SelectedTypePerson, initialStateSelectedTypePerson } from '@web/app/features/c/type-person/models/selected-type-person.model';

export interface State {
  selected: SelectedTypePerson;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedTypePerson,
  error: '',
  pending: false
};

export const reducer = createReducer(
  initialState,
  on(
    fromTypePersonActions.EntityActions.SetSelected,
    (state, { selected }) => ({
      ...state,
      selected: { ...state.selected, ...selected }
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadFailEntity,
    fromTypePersonActions.EntityActions.StoreFailEntity,
    fromTypePersonActions.EntityActions.UpdateFailEntity,
    fromTypePersonActions.EntityActions.DestroyFailEntity,
    (state, { error }) => ({
      ...state,
      selected: initialStateSelectedTypePerson,
      error: JSON.stringify(error),
      pending: false
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadEntity,
    fromTypePersonActions.EntityActions.PaginateEntity,
    fromTypePersonActions.EntityActions.StoreEntity,
    fromTypePersonActions.EntityActions.UpdateEntity,
    fromTypePersonActions.EntityActions.DestroyEntity,
    (state) => ({
      ...state,
      pending: true
    })
  ),
  on(
    fromTypePersonActions.EntityActions.LoadSuccessEntity,
    fromTypePersonActions.EntityActions.StoreSuccessEntity,
    fromTypePersonActions.EntityActions.UpdateSuccessEntity,
    fromTypePersonActions.EntityActions.DestroySuccessEntity,
    (state) => ({
      ...state,
      selected: initialStateSelectedTypePerson,
      pending: false
    })
  ),
  on(
    fromTypePersonActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
