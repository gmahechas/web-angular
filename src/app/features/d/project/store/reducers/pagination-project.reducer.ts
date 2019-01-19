import { EntityActionTypes, EntityActions } from '@web/app/features/d/project/store/actions/entity-project.actions';

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
        total: action.payload.entities.paginationProject.total,
        perPage: action.payload.entities.paginationProject.per_page,
        currentPage: action.payload.entities.paginationProject.current_page,
        from: action.payload.entities.paginationProject.from,
        to: action.payload.entities.paginationProject.to
      };
    }

    case EntityActionTypes.LoadFailEntity: {
      return initialState;
    }

    case EntityActionTypes.StoreSuccessEntity: {
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
