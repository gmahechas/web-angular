import { EntityActionTypes, EntityActions } from '@web/app/features/b/office-department/store/actions/entity-office-department.actions';

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
        total: action.payload.entities.paginationOfficeDepartment.total,
        perPage: action.payload.entities.paginationOfficeDepartment.per_page,
        currentPage: action.payload.entities.paginationOfficeDepartment.current_page,
        from: action.payload.entities.paginationOfficeDepartment.from,
        to: action.payload.entities.paginationOfficeDepartment.to
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
