import { EntityActionTypes, EntityActions } from '@web/app/three/project/store/actions/entity-project.actions';

export interface State {
  error: string;
}

export const initialState: State = {
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
        error: action.payload.error
      };
    }

    default:
      return state;
  }

}

export const getError = (state: State) => state.error;
