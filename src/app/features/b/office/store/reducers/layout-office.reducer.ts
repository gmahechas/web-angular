import { EntityActionTypes, EntityActions } from '@web/app/features/b/office/store/actions/entity-office.actions';
import { SelectedOffice, initialStateSelectedOffice } from '@web/app/features/b/office/models/selected-office.model';

export interface State {
  selected: SelectedOffice;
  error: any;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedOffice,
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.SetSelected: {
      return {
        ...state,
        selected: { ...state.selected, ...action.payload.selected}
      };
    }

    case EntityActionTypes.LoadFailEntity:
    case EntityActionTypes.StoreFailEntity:
    case EntityActionTypes.UpdateFailEntity:
    case EntityActionTypes.DestroyFailEntity: {
      return {
        ...state,
        selected: initialStateSelectedOffice,
        error: action.payload.error,
        pending: false
      };
    }

    case EntityActionTypes.LoadEntity:
    case EntityActionTypes.PaginateEntity:
    case EntityActionTypes.StoreEntity:
    case EntityActionTypes.UpdateEntity:
    case EntityActionTypes.DestroyEntity: {
      return {
        ...state,
        pending: true
      };
    }

    case EntityActionTypes.LoadSuccessEntity:
    case EntityActionTypes.StoreSuccessEntity:
    case EntityActionTypes.UpdateSuccessEntity:
    case EntityActionTypes.DestroySuccessEntity: {
      return {
        ...state,
        selected: initialStateSelectedOffice,
        pending: false
      };
    }

    case EntityActionTypes.Reset: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
