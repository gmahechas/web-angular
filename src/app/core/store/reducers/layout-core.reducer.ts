import { LayoutActionTypes, LayoutActions, CloseSpinner, ShowProgressBar } from './../actions/layout-core.actions';

export interface State {
  menuItems: any[];
  showSidenav: boolean;
  blockedDocument: boolean;
  showSpinner: boolean;
  progressBar: boolean;
}

const initialState: State = {
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
  showSidenav: false,
  blockedDocument: false,
  showSpinner: false,
  progressBar: false
};

export function reducer(state: State = initialState, action: LayoutActions): State {
  switch (action.type) {

    case LayoutActionTypes.OpenSidenav:
      return {
        ...state,
        showSidenav: true,
      };

    case LayoutActionTypes.CloseSidenav:
      return {
        ...state,
        showSidenav: false,
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

export const getMenuItems = (state: State) => state.menuItems;
export const getShowSidenav = (state: State) => state.showSidenav;
export const getBlockedDocument = (state: State) => state.blockedDocument;
export const getShowSpinner = (state: State) => state.showSpinner;
export const getProgressBar = (state: State) => state.progressBar;
