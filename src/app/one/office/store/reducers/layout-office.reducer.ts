import { EntityActionTypes, EntityActions } from '../actions/entity-office.actions';

export interface State {
  error: any;
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
      console.log(action.payload.error);
      return {
        ...state,
        error: action.payload.error
      };
    }

    default:
      return state;
  }

}

export const getError = (state: State) => state.error;
