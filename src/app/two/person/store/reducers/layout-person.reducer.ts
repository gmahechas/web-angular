import { EntityActionTypes, EntityActions } from '../actions/entity-person.actions';

export interface State {
  error: string;
}

const initialState: State = {
  error: ''
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {
    case EntityActionTypes.LoadFailEntity:
    case EntityActionTypes.StoreFailEntity:
    case EntityActionTypes.UpdateFailEntity:
    case EntityActionTypes.DestroyFailEntity: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }

}

export const getError = (state: State) => state.error;
