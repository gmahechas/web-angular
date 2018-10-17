import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';

export interface State {
  showSidebar: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
}

export  const initialState: State = {
  showSidebar: false,
  blockedDocument: false,
  showSpinner: false,
  progressBar: false
};

export function reducer(state: State = initialState, action: LayoutActions): State {
  switch (action.type) {

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

    default:
      return state;
  }
}

export const getShowSidebar = (state: State) => state.showSidebar;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
