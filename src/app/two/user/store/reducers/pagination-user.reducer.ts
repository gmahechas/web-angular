import { EntityActionTypes, EntityActions } from '../actions/entity-user.actions';

export interface State {
  total: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

const initialState: State = {
  total: null,
  perPage: null,
  currentPage: null,
  from: null,
  to: null
};

export function reducer(state = initialState, action: EntityActions): State {

  switch (action.type) {

    case EntityActionTypes.LoadEntity: {
      return initialState;
    }

    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
        total: action.payload.paginationUser.total,
        perPage: action.payload.paginationUser.per_page,
        currentPage: action.payload.paginationUser.current_page,
        from: action.payload.paginationUser.from,
        to: action.payload.paginationUser.to
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return initialState;
    }

    default:
      return state;
  }

}

export const getTotal = (state: State) => state.total;
export const getPerPage = (state: State) => state.perPage;
export const getCurrentPage = (state: State) => state.currentPage;
export const getFrom = (state: State) => state.from;
export const getTo = (state: State) => state.to;
