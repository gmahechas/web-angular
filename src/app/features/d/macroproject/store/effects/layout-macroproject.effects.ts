import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutMacroprojectEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActionTypes.LoadEntity,
        fromMacroprojectActions.EntityActionTypes.StoreEntity,
        fromMacroprojectActions.EntityActionTypes.UpdateEntity,
        fromMacroprojectActions.EntityActionTypes.DestroyEntity,
        fromMacroprojectActions.EntityActionTypes.PaginateEntity,
        fromMacroprojectActions.EntityActionTypes.LoadEntityShared
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  loadSuccessEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActionTypes.LoadSuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActionTypes.StoreSuccessEntity,
        fromMacroprojectActions.EntityActionTypes.UpdateSuccessEntity,
        fromMacroprojectActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
        this.store.dispatch(new fromCore.ShowMessages({
          messages: [
            { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
          ]
        }));
      })
    ),
    { dispatch: false }
  );

  fail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActionTypes.LoadFailEntity,
        fromMacroprojectActions.EntityActionTypes.StoreFailEntity,
        fromMacroprojectActions.EntityActionTypes.UpdateFailEntity,
        fromMacroprojectActions.EntityActionTypes.DestroyFailEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
        this.store.dispatch(new fromCore.ShowMessages({
          messages: [
            { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
          ]
        }));
      })
    ),
    { dispatch: false }
  );

  // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActionTypes.LoadEntity,
        fromMacroprojectActions.EntityActionTypes.StoreSuccessEntity,
        fromMacroprojectActions.EntityActionTypes.UpdateSuccessEntity,
        fromMacroprojectActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMacroprojectActions.EntityActionTypes.Reset),
      map((action: fromMacroprojectActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
        }
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
