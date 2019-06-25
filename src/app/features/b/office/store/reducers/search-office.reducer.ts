import { createReducer, on } from '@ngrx/store';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';
import { SearchOffice } from '@web/app/features/b/office/models/search-office.model';

export interface State {
  loaded: boolean;
  query: SearchOffice;
}

export const initialState: State = {
  loaded: false,
  query: {
    office: {
      office_id: '',
      office_name: ''
    },
    city: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromOfficeActions.EntityActions.LoadEntity,
    fromOfficeActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        office: search.office,
        city: search.city
      }
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromOfficeActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromOfficeActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
