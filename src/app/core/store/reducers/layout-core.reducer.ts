import { LayoutActionTypes, LayoutActions } from '@web/app/core/store/actions/layout-core.actions';

export interface State {
  showSidebar: boolean;
  menuItems: any[];
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
}

export  const initialState: State = {
  showSidebar: false,
  menuItems: [
    {
      icon: '',
      label: 'Inicio',
      routerLink: 'dashboard'
    },
    {
      icon: 'fas fa-cog',
      label: 'Configuracion',
      items: [
        {
          label: 'Mantenimiento',
          items: [
            {
              label: 'Paises',
              routerLink: 'country'
            },
            {
              label: 'Estados',
              routerLink: 'state'
            }
          ]
        }
      ]
    }
  ],
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
export const getMenuItems = (state: State) => state.menuItems;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
