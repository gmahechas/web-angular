import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';

import { Office } from '@web/app/features/b/office/models/office.model';
import { Project } from '@web/app/features/d/project/models/project.model';

export interface State {
  lang: string;
  showSidebar: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
  office: Office;
  project: Project;
}

export const initialState: State = {
  lang: null,
  showSidebar: false,
  blockedDocument: false,
  showSpinner: false,
  progressBar: false,
  office: null,
  project: null
};

export function reducer(state: State = initialState, action: LayoutActions): State {
  switch (action.type) {

    case LayoutActionTypes.SetDefaultLang:
    case LayoutActionTypes.ChangeLang:
      return {
        ...state,
        lang: action.payload.lang
      };

    case LayoutActionTypes.OpenSidebar:
      return {
        ...state,
        showSidebar: true
      };

    case LayoutActionTypes.CloseSidebar:
      return {
        ...state,
        showSidebar: false
      };

    case LayoutActionTypes.BlockedDocument:
      return {
        ...state,
        blockedDocument: true
      };

    case LayoutActionTypes.UnblockedDocument:
      return {
        ...state,
        blockedDocument: false
      };

    case LayoutActionTypes.ShowSpinner:
      return {
        ...state,
        showSpinner: true,
      };

    case LayoutActionTypes.CloseSpinner:
      return {
        ...state,
        showSpinner: false,
      };

    case LayoutActionTypes.ShowProgressBar:
      return {
        ...state,
        progressBar: true,
      };

    case LayoutActionTypes.CloseProgressBar:
      return {
        ...state,
        progressBar: false,
      };

    case LayoutActionTypes.SetOffice:
      return {
        ...state,
        office: action.payload.office
      };

      case LayoutActionTypes.SetProject:
      return {
        ...state,
        project: action.payload.project
      };

    default:
      return state;
  }
}

export const getLang = (state: State) => state.lang;
export const getShowSidebar = (state: State) => state.showSidebar;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
export const getOffice = (state: State) => state.office;
export const getProject = (state: State) => state.project;
