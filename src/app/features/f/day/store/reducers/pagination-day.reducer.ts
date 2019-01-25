import { EntityActionTypes, EntityActions } from '@web/app/features/f/day/store/actions/entity-day.actions';

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

    case EntityActionTypes.LoadSuccessEntity: {
      return {
        ...state,
        total: action.payload.entities.paginationDay.total,
        perPage: action.payload.entities.paginationDay.per_page,
        currentPage: action.payload.entities.paginationDay.current_page,
        from: action.payload.entities.paginationDay.from,
        to: action.payload.entities.paginationDay.to
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return initialState;
    }

    case EntityActionTypes.ResetSearch: {
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
