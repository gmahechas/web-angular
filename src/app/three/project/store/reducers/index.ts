import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from '@web/app/three/project/store/reducers/entity-project.reducer';
import * as fromSearch from '@web/app/three/project/store/reducers/search-project.reducer';
import * as fromPagination from '@web/app/three/project/store/reducers/pagination-project.reducer';
import * as fromLayout from '@web/app/three/project/store/reducers/layout-project.reducer';
import * as fromCore from '@web/app/core/store';

export interface ProjectState {
  entity: fromEntity.State;
  search: fromSearch.State;
  pagination: fromPagination.State;
  layout: fromLayout.State;
}

export const reducers: ActionReducerMap<ProjectState> = {
  entity: fromEntity.reducer,
  search: fromSearch.reducer,
  pagination: fromPagination.reducer,
  layout: fromLayout.reducer
};

export interface State extends fromCore.State {
  project: ProjectState;
}

export const getProjectState = createFeatureSelector<State, ProjectState>('project');
