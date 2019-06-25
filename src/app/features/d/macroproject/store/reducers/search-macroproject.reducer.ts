import { createReducer, on } from '@ngrx/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';
import { SearchMacroproject } from '@web/app/features/d/macroproject/models/search-macroproject.model';

export interface State {
  loaded: boolean;
  query: SearchMacroproject;
}

export const initialState: State = {
  loaded: false,
  query: {
    macroproject: {
      macroproject_id: '',
      macroproject_name: ''
    },
    city: null,
    office: null
  }
};

export const reducer = createReducer(
  initialState,
  on(
    fromMacroprojectActions.EntityActions.LoadEntity,
    fromMacroprojectActions.EntityActions.LoadEntityShared,
    (state, { search }) => ({
      ...state,
      loaded: false,
      query: {
        macroproject: search.macroproject,
        city: search.city,
        office: search.office
      }
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadSuccessEntity,
    (state) => ({
      ...state,
      loaded: true
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.LoadFailEntity,
    (state) => ({
      ...state,
      loaded: false
    })
  ),
  on(
    fromMacroprojectActions.EntityActions.Reset,
    (state) => ({
      ...initialState
    })
  )
);

export const getLoaded = (state: State) => state.loaded;
export const getQuery = (state: State) => state.query;
