import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutProfileMenuEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProfileMenuActions.EntityActions.LoadEntity,
        fromProfileMenuActions.EntityActions.StoreEntity,
        fromProfileMenuActions.EntityActions.UpdateEntity,
        fromProfileMenuActions.EntityActions.DestroyEntity,
        fromProfileMenuActions.EntityActions.PaginateEntity,
        fromProfileMenuActions.EntityActions.LoadEntityShared
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
        fromProfileMenuActions.EntityActions.LoadSuccessEntity
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
        fromProfileMenuActions.EntityActions.StoreSuccessEntity,
        fromProfileMenuActions.EntityActions.UpdateSuccessEntity,
        fromProfileMenuActions.EntityActions.DestroySuccessEntity
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
        fromProfileMenuActions.EntityActions.LoadFailEntity,
        fromProfileMenuActions.EntityActions.StoreFailEntity,
        fromProfileMenuActions.EntityActions.UpdateFailEntity,
        fromProfileMenuActions.EntityActions.DestroyFailEntity
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

  /* // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProfileMenuActions.EntityActions.LoadEntity,
        fromProfileMenuActions.EntityActions.StoreSuccessEntity,
        fromProfileMenuActions.EntityActions.UpdateSuccessEntity,
        fromProfileMenuActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['profile_menu'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['profile_menu'] }));
        }
      })
    ),
    { dispatch: false }
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
