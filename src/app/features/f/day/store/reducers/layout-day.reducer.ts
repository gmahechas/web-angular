import { EntityActionTypes, EntityActions } from '@web/app/features/f/day/store/actions/entity-day.actions';

export interface State {
  selected: any;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  selected: null,
  error: '',
  pending: false
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadFailEntity: {
      return {
        ...state,
        error: action.payload.error,
        pending: true
      };
    }


    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
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
