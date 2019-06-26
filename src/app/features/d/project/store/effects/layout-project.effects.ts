import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutProjectEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProjectActions.EntityActions.LoadEntity,
        fromProjectActions.EntityActions.StoreEntity,
        fromProjectActions.EntityActions.UpdateEntity,
        fromProjectActions.EntityActions.DestroyEntity,
        fromProjectActions.EntityActions.PaginateEntity,
        fromProjectActions.EntityActions.LoadEntityShared
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  loadSuccessEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProjectActions.EntityActions.LoadSuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProjectActions.EntityActions.StoreSuccessEntity,
        fromProjectActions.EntityActions.UpdateSuccessEntity,
        fromProjectActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
        this.store.dispatch(fromCore.LayoutActions.ShowMessages({
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
        fromProjectActions.EntityActions.LoadFailEntity,
        fromProjectActions.EntityActions.StoreFailEntity,
        fromProjectActions.EntityActions.UpdateFailEntity,
        fromProjectActions.EntityActions.DestroyFailEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
        this.store.dispatch(fromCore.LayoutActions.ShowMessages({
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
        fromProjectActions.EntityActions.LoadEntity,
        fromProjectActions.EntityActions.StoreSuccessEntity,
        fromProjectActions.EntityActions.UpdateSuccessEntity,
        fromProjectActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['project'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProjectActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['project'] }));
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
