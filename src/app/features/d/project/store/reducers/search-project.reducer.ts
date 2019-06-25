import { createReducer, on } from '@ngrx/store';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';
import { SearchProject } from '@web/app/features/d/project/models/search-project.model';

export interface State {
  loaded: boolean;
  query: SearchProject;
}

export const initialState: State = {
  loaded: false,
  query: {
    project: {
      project_id: '',
      project_name: ''
    },
    macroproject: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromProjectActions.EntityActions.LoadEntity,
    fromProjectActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        project: search.project,
        macroproject: search.macroproject
      }
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromProjectActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromProjectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
