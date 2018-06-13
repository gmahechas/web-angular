import { EntityActionTypes, EntityActions } from '../actions/entity-estate.actions';

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
        total: action.payload.paginationEstate.total,
        perPage: action.payload.paginationEstate.per_page,
        currentPage: action.payload.paginationEstate.current_page,
        from: action.payload.paginationEstate.from,
        to: action.payload.paginationEstate.to
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
