import { LayoutActionTypes, LayoutActions } from './../actions/layout-core.actions';
import { MenuItem } from 'primeng/api';

export interface State {
  menuItems: MenuItem[];
  showSidenav: boolean;
  blockedDocument: boolean;
}

const initialState: State = {
  menuItems: [
    {
      icon: '',
      label: 'Inicio',
      routerLink: ['dashboard']
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
              routerLink: ['country']
            }
          ]
        }
      ]
    }
  ],
  showSidenav: false,
  blockedDocument: false,
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

    default:
      return state;
  }
}

export const getMenuItems = (state: State) => state.menuItems;
export const getShowSidenav = (state: State) => state.showSidenav;
export const getBlockedDocument = (state: State) => state.blockedDocument;
