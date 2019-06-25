import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeProjectEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromUserOfficeProjectActions.EntityActions.LoadEntity,
        fromUserOfficeProjectActions.EntityActions.StoreEntity,
        fromUserOfficeProjectActions.EntityActions.UpdateEntity,
        fromUserOfficeProjectActions.EntityActions.DestroyEntity,
        fromUserOfficeProjectActions.EntityActions.PaginateEntity,
        fromUserOfficeProjectActions.EntityActions.LoadEntityShared
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
        fromUserOfficeProjectActions.EntityActions.LoadSuccessEntity
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
        fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity,
        fromUserOfficeProjectActions.EntityActions.UpdateSuccessEntity,
        fromUserOfficeProjectActions.EntityActions.DestroySuccessEntity
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
        fromUserOfficeProjectActions.EntityActions.LoadFailEntity,
        fromUserOfficeProjectActions.EntityActions.StoreFailEntity,
        fromUserOfficeProjectActions.EntityActions.UpdateFailEntity,
        fromUserOfficeProjectActions.EntityActions.DestroyFailEntity
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
        fromUserOfficeProjectActions.EntityActions.LoadEntity,
        fromUserOfficeProjectActions.EntityActions.StoreSuccessEntity,
        fromUserOfficeProjectActions.EntityActions.UpdateSuccessEntity,
        fromUserOfficeProjectActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['user_office_project'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromUserOfficeProjectActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['user_office_project'] }));
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
