import { EntityActionTypes, EntityActions } from '@web/app/features/e/workflow/store/actions/entity-workflow.actions';
import { SelectedWorkflow, initialStateSelectedWorkflow } from '@web/app/features/e/workflow/models/selected-workflow.model';

export interface State {
  selected: SelectedWorkflow;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: initialStateSelectedWorkflow,
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
        selected: initialStateSelectedWorkflow,
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
        selected: initialStateSelectedWorkflow,
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
