import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';
import { SearchUserOffice } from '@web/app/features/c/user-office/models/search-user-office.model';

export interface State {
  loaded: boolean;
  query: SearchUserOffice;
}

export const initialState: State = {
  loaded: false,
  query: {
    user_office: {
      user_office_id: '',
      user_office_status: null
    },
    user: null,
    office: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeActions.EntityActions.LoadEntity,
    fromUserOfficeActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: { ...state.query, ...search }
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromUserOfficeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
