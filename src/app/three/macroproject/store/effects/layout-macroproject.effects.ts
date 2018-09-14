import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '../../../../core/store';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutMacroprojectEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadEntity,
      fromActions.EntityActionTypes.StoreEntity,
      fromActions.EntityActionTypes.UpdateEntity,
      fromActions.EntityActionTypes.DestroyEntity,
      fromActions.EntityActionTypes.PaginateEntity,
      fromActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.StoreSuccessEntity,
      fromActions.EntityActionTypes.UpdateSuccessEntity,
      fromActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages([
        { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
      ]));
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadFailEntity,
      fromActions.EntityActionTypes.StoreFailEntity,
      fromActions.EntityActionTypes.UpdateFailEntity,
      fromActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(action => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages([
        { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
      ]));
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  loadEntity$ = this.actions$.pipe(
    ofType(
      fromActions.EntityActionTypes.LoadEntity,
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
    })
  );

  @Effect({ dispatch: false })
  storeSuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreSuccessEntity>(fromActions.EntityActionTypes.StoreSuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.StoreMacroproject) => {
      this.store.dispatch(new fromActions.LoadEntity({
        macroproject: {
          macroproject_id: String(data.storeMacroproject.macroproject_id),
          macroproject_name: data.storeMacroproject.macroproject_name
        },
        city: data.storeMacroproject.city,
        office: data.storeMacroproject.office
      }));
    })
  );

  @Effect({ dispatch: false })
  updateSuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateSuccessEntity>(fromActions.EntityActionTypes.UpdateSuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.UpdateMacroproject) => {
      this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
    })
  );

  @Effect({ dispatch: false })
  destroySuccessEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroySuccessEntity>(fromActions.EntityActionTypes.DestroySuccessEntity),
    map(action => action.payload),
    tap((data: fromModels.DestroyMacroproject) => {
      this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
