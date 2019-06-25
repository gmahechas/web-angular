import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromUserOfficeActions.EntityActions.LoadEntity,
        fromUserOfficeActions.EntityActions.StoreEntity,
        fromUserOfficeActions.EntityActions.UpdateEntity,
        fromUserOfficeActions.EntityActions.DestroyEntity,
        fromUserOfficeActions.EntityActions.PaginateEntity,
        fromUserOfficeActions.EntityActions.LoadEntityShared
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
        fromUserOfficeActions.EntityActions.LoadSuccessEntity
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
        fromUserOfficeActions.EntityActions.StoreSuccessEntity,
        fromUserOfficeActions.EntityActions.UpdateSuccessEntity,
        fromUserOfficeActions.EntityActions.DestroySuccessEntity
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
        fromUserOfficeActions.EntityActions.LoadFailEntity,
        fromUserOfficeActions.EntityActions.StoreFailEntity,
        fromUserOfficeActions.EntityActions.UpdateFailEntity,
        fromUserOfficeActions.EntityActions.DestroyFailEntity
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
        fromUserOfficeActions.EntityActions.LoadEntity,
        fromUserOfficeActions.EntityActions.StoreSuccessEntity,
        fromUserOfficeActions.EntityActions.UpdateSuccessEntity,
        fromUserOfficeActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['user_office'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['user_office'] }));
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
