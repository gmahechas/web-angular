import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';
import { AuthActionTypes, AuthActions } from '@web/app/auth/store/actions/auth.actions';

import { Company } from '@web/app/features/b/company/models/company.model';
import { UserOffice } from '@web/app/features/c/user-office/models';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { ProfileMenu } from '@web/app/features/c/profile-menu/models/profile-menu.model';

export interface State {
  lang: string;
  showSidebar: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
  company: Company | null;
  userOffice: UserOffice | null;
  userOfficeProject: UserOfficeProject | null;
  selectedMenus: {
    selected: number | null,
    profileMenus: ProfileMenu[];
  };
}

export const initialState: State = {
  lang: null,
  showSidebar: false,
  blockedDocument: false,
  showSpinner: false,
  progressBar: false,
  company: null,
  userOffice: null,
  userOfficeProject: null,
  selectedMenus: {
    selected: null,
    profileMenus: []
  }
};

export function reducer(state: State = initialState, action: LayoutActions | AuthActions): State {
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

    case AuthActionTypes.AuthSuccess: {
      return {
        ...state,
        company: action.payload.company
      };
    }

    case AuthActionTypes.CheckAuthSuccess: {
      return {
        ...state,
        company: action.payload.checkAuth.company
      };
    }

    case AuthActionTypes.LogoutAuthSuccess:
    case AuthActionTypes.CheckAuthFailure: {
      return {
        ...state,
        company: null,
        userOffice: null,
        userOfficeProject: null
      };
    }

    case LayoutActionTypes.SetUserOffice:
      return {
        ...state,
        userOffice: action.payload.userOffice
      };

    case LayoutActionTypes.SetUserOfficeProject:
      return {
        ...state,
        userOfficeProject: action.payload.userOfficeProject
      };

    case LayoutActionTypes.AddSelectedMenu:
      return {
        ...state,
        selectedMenus: {
          selected: action.payload.profile_menu.profile_menu_id,
          profileMenus: (state.selectedMenus.profileMenus.includes(action.payload.profile_menu)) ?
            [...state.selectedMenus.profileMenus] :
            [...state.selectedMenus.profileMenus, action.payload.profile_menu]
        }
      };

    case LayoutActionTypes.ChangeSelectedMenu: {
      return {
        ...state,
        selectedMenus: {
          selected: action.payload.profile_menu_id,
          profileMenus: state.selectedMenus.profileMenus
        }
      };
    }

    default:
      return state;
  }
}

export const getLang = (state: State) => state.lang;
export const getShowSidebar = (state: State) => state.showSidebar;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
export const getCompany = (state: State) => state.company;
export const getUserOffice = (state: State) => state.userOffice;
export const getUserOfficeProject = (state: State) => state.userOfficeProject;
export const getSelectedMenus = (state: State) => state.selectedMenus;
