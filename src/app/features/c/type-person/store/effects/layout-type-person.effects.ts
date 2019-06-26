import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromTypePersonActions.EntityActions.LoadEntity,
        fromTypePersonActions.EntityActions.StoreEntity,
        fromTypePersonActions.EntityActions.UpdateEntity,
        fromTypePersonActions.EntityActions.DestroyEntity,
        fromTypePersonActions.EntityActions.PaginateEntity,
        fromTypePersonActions.EntityActions.LoadEntityShared
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
        fromTypePersonActions.EntityActions.LoadSuccessEntity
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
        fromTypePersonActions.EntityActions.StoreSuccessEntity,
        fromTypePersonActions.EntityActions.UpdateSuccessEntity,
        fromTypePersonActions.EntityActions.DestroySuccessEntity
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
        fromTypePersonActions.EntityActions.LoadFailEntity,
        fromTypePersonActions.EntityActions.StoreFailEntity,
        fromTypePersonActions.EntityActions.UpdateFailEntity,
        fromTypePersonActions.EntityActions.DestroyFailEntity
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
        fromTypePersonActions.EntityActions.LoadEntity,
        fromTypePersonActions.EntityActions.StoreSuccessEntity,
        fromTypePersonActions.EntityActions.UpdateSuccessEntity,
        fromTypePersonActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['type-person'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['type-person'] }));
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
