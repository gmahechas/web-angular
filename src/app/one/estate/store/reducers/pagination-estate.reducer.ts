import { EntityActionTypes, EntityActions } from '../actions/entity-estate.actions';

export interface State {
  total: number;
  perPage: number;
  currentPage: number;
  from: number;
  to: number;
}

export const initialState: State = {
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
        total: action.payload.entities.paginationEstate.total,
        perPage: action.payload.entities.paginationEstate.per_page,
        currentPage: action.payload.entities.paginationEstate.current_page,
        from: action.payload.entities.paginationEstate.from,
        to: action.payload.entities.paginationEstate.to
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return initialState;
    }

    case EntityActionTypes.StoreSuccessEntity: {
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
