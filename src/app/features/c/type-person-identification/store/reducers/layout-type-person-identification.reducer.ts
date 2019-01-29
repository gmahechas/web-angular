import {
  EntityActionTypes,
  EntityActions
} from '@web/app/features/c/type-person-identification/store/actions/entity-type-person-identification.actions';
import {
  SelectedTypePersonIdentification, initialStateSelectedTypePersonIdentification
} from '@web/app/features/c/type-person-identification/models/selected-type-person-identification.model';

export interface State {
  selected: SelectedTypePersonIdentification;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedTypePersonIdentification,
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.SetSelect: {
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
        selected: initialStateSelectedTypePersonIdentification,
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
        selected: initialStateSelectedTypePersonIdentification,
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
