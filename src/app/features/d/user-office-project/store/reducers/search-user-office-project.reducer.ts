import { createReducer, on } from '@ngrx/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';
import { SearchUserOfficeProject } from '@web/app/features/d/user-office-project/models/search-user-office-project.model';

export interface State {
  loaded: boolean;
  query: SearchUserOfficeProject;
}

export const initialState: State = {
  loaded: false,
  query: {
    user_office_project: {
      user_office_project_id: '',
      user_office_project_status: null
    },
    user_office: null,
    project: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromUserOfficeProjectActions.EntityActions.LoadEntity,
    fromUserOfficeProjectActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: { ...state.query, ...search }
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromUserOfficeProjectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
