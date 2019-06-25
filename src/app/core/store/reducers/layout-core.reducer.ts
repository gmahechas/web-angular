import { createReducer, on } from '@ngrx/store';
import * as fromCoreActions from '@web/app/core/store/actions';

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

export const reducer = createReducer(
  initialState,
  on(
    fromCoreActions.LayoutActions.SetDefaultLang,
    fromCoreActions.LayoutActions.ChangeLang,
    (state, { lang }) => ({
      ...state,
      lang
    })
  ),
  on(
    fromCoreActions.LayoutActions.ShowSidebar,
    (state, { toggle }) => ({
      ...state,
      showSidebar: toggle
    })
  ),
  on(
    fromCoreActions.LayoutActions.BlockedDocument,
    (state, { toggle }) => ({
      ...state,
      blockedDocument: toggle
    })
  ),
  on(
    fromCoreActions.LayoutActions.ShowSpinner,
    (state, { toggle }) => ({
      ...state,
      showSpinner: toggle
    })
  ),
  on(
    fromCoreActions.LayoutActions.ShowProgressBar,
    (state, { toggle }) => ({
      ...state,
      progressBar: toggle
    })
  ),
  on(
    fromCoreActions.LayoutActions.SetUserOffice,
    (state, { userOffice, redirect }) => ({
      ...state,
      userOffice,
      userOfficeProject: null
    })
  ),
  on(
    fromCoreActions.LayoutActions.SetUserOfficeProject,
    (state, { userOfficeProject, redirect }) => ({
      ...state,
      userOfficeProject
    })
  ),
  on(
    fromCoreActions.LayoutActions.AddSelectedMenu,
    (state, { profile_menu }) => {
      const found = state.selectedMenus.profileMenus.filter(profileMenu => {
        return String(profileMenu.menu_id) === profile_menu.menu_id;
      });

      return {
        ...state,
        selectedMenus: {
          selected: (found.length > 0) ?
            (found[0].menu_id === 1) ? initialProfileMenu : profile_menu : profile_menu,
          profileMenus: (found.length > 0) ?
            [...state.selectedMenus.profileMenus] :
            [...state.selectedMenus.profileMenus, profile_menu]
        }
      };
    }
  ),
  on(
    fromCoreActions.LayoutActions.ChangeSelectedMenu,
    (state, { profile_menu }) => ({
      ...state,
      selectedMenus: {
        selected: profile_menu,
        profileMenus: state.selectedMenus.profileMenus
      }
    })
  ),
  on(
    fromCoreActions.LayoutActions.RemoveSelectedMenu,
    (state, { index }) => {
      const oldRecipes = [...state.selectedMenus.profileMenus];
      oldRecipes.splice(index, 1);
      return {
        ...state,
        selectedMenus: {
          selected: state.selectedMenus.selected,
          profileMenus: oldRecipes
        }
      };
    }
  )
);

/*

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

 */

export const getLang = (state: State) => state.lang;
export const getShowSidebar = (state: State) => state.showSidebar;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
export const getCompany = (state: State) => state.company;
export const getUserOffice = (state: State) => state.userOffice;
export const getUserOfficeProject = (state: State) => state.userOfficeProject;
export const getSelectedMenus = (state: State) => state.selectedMenus;
