import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';
import { AuthActionTypes, AuthActions } from '@web/app/auth/store/actions/auth.actions';

import { Company } from '@web/app/features/b/company/models/company.model';
import { UserOffice } from '@web/app/features/c/user-office/models';
import { UserOfficeProject } from '@web/app/features/d/user-office-project/models/user-office-project.model';
import { initialStateSelectedMenus, SelectedMenus, initialProfileMenu } from '@web/app/core/models/selected-menus.model';

export interface State {
  lang: string;
  showSidebar: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
  company: Company | null;
  userOffice: UserOffice | null;
  userOfficeProject: UserOfficeProject | null;
  selectedMenus: SelectedMenus;
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
  selectedMenus: initialStateSelectedMenus
};

export function reducer(state: State = initialState, action: LayoutActions | AuthActions): State {
  switch (action.type) {

    case LayoutActionTypes.SetDefaultLang:
    case LayoutActionTypes.ChangeLang:
      return {
        ...state,
        lang: action.payload.lang
      };

    case LayoutActionTypes.OpenCloseSidebar:
      return {
        ...state,
        showSidebar: action.payload.showSidebar
      };

    case LayoutActionTypes.BlockedDocument:
      return {
        ...state,
        blockedDocument: action.payload.toggle
      };

    case LayoutActionTypes.ShowSpinner:
      return {
        ...state,
        showSpinner: action.payload.toggle,
      };

    case LayoutActionTypes.ShowProgressBar:
      return {
        ...state,
        progressBar: action.payload.toggle,
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
        userOffice: action.payload.userOffice,
        userOfficeProject: null
      };

    case LayoutActionTypes.SetUserOfficeProject:
      return {
        ...state,
        userOfficeProject: action.payload.userOfficeProject
      };

    case LayoutActionTypes.AddSelectedMenu:

      const found = state.selectedMenus.profileMenus.filter(profileMenu => {
        return String(profileMenu.menu_id) === action.payload.profile_menu.menu_id;
      });

      return {
        ...state,
        selectedMenus: {
          selected: (found.length > 0) ?
            (found[0].menu_id === 1) ? initialProfileMenu : action.payload.profile_menu : action.payload.profile_menu,
          profileMenus: (found.length > 0) ?
            [...state.selectedMenus.profileMenus] :
            [...state.selectedMenus.profileMenus, action.payload.profile_menu]
        }
      };

    case LayoutActionTypes.ChangeSelectedMenu: {
      return {
        ...state,
        selectedMenus: {
          selected: action.payload.profile_menu,
          profileMenus: state.selectedMenus.profileMenus
        }
      };
    }

    case LayoutActionTypes.RemoveSelectedMenu: {
      const oldRecipes = [...state.selectedMenus.profileMenus];
      oldRecipes.splice(action.payload.index, 1);
      return {
        ...state,
        selectedMenus: {
          selected: state.selectedMenus.selected,
          profileMenus: oldRecipes
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
