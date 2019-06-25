import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromMacroprojectActions from '@web/app/features/d/macroproject/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutMacroprojectEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromMacroprojectActions.EntityActions.LoadEntity,
        fromMacroprojectActions.EntityActions.StoreEntity,
        fromMacroprojectActions.EntityActions.UpdateEntity,
        fromMacroprojectActions.EntityActions.DestroyEntity,
        fromMacroprojectActions.EntityActions.PaginateEntity,
        fromMacroprojectActions.EntityActions.LoadEntityShared
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
        fromMacroprojectActions.EntityActions.LoadSuccessEntity
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
        fromMacroprojectActions.EntityActions.StoreSuccessEntity,
        fromMacroprojectActions.EntityActions.UpdateSuccessEntity,
        fromMacroprojectActions.EntityActions.DestroySuccessEntity
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
        fromMacroprojectActions.EntityActions.LoadFailEntity,
        fromMacroprojectActions.EntityActions.StoreFailEntity,
        fromMacroprojectActions.EntityActions.UpdateFailEntity,
        fromMacroprojectActions.EntityActions.DestroyFailEntity
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
        fromMacroprojectActions.EntityActions.LoadEntity,
        fromMacroprojectActions.EntityActions.StoreSuccessEntity,
        fromMacroprojectActions.EntityActions.UpdateSuccessEntity,
        fromMacroprojectActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['macroproject'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMacroprojectActions.EntityActions.Reset),
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
