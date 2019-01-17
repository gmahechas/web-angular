import { EntityActionTypes, EntityActions } from '@web/app/features/b/office-department/store/actions/entity-office-department.actions';
import { SelectedOfficeDepartment, initialStateSelectedOfficeDepartment } from '@web/app/features/b/office-department/models/selected-office-department.model';

export interface State {
  selected: SelectedOfficeDepartment;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedOfficeDepartment,
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.SetSelected: {
      return {
        ...state,
        selected: action.payload.selected
      };
    }

    case EntityActionTypes.LoadFailEntity:
    case EntityActionTypes.StoreFailEntity:
    case EntityActionTypes.UpdateFailEntity:
    case EntityActionTypes.DestroyFailEntity: {
      return {
        ...state,
        selected: initialStateSelectedOfficeDepartment,
        error: action.payload.error,
        pending: true
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
        selected: initialStateSelectedOfficeDepartment,
        pending: false
      };
    }

    case EntityActionTypes.ResetSearch: {
      return initialState;
    }
    
    default:
      return state;
  }

}

export const getSelected = (state: State) => state.selected;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
