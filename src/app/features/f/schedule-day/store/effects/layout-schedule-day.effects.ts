import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleDayEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromScheduleDayActions.EntityActions.LoadEntity,
        fromScheduleDayActions.EntityActions.StoreEntity,
        fromScheduleDayActions.EntityActions.UpdateEntity,
        fromScheduleDayActions.EntityActions.DestroyEntity,
        fromScheduleDayActions.EntityActions.PaginateEntity,
        fromScheduleDayActions.EntityActions.LoadEntityShared
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
        fromScheduleDayActions.EntityActions.LoadSuccessEntity
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
        fromScheduleDayActions.EntityActions.StoreSuccessEntity,
        fromScheduleDayActions.EntityActions.UpdateSuccessEntity,
        fromScheduleDayActions.EntityActions.DestroySuccessEntity
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
        fromScheduleDayActions.EntityActions.LoadFailEntity,
        fromScheduleDayActions.EntityActions.StoreFailEntity,
        fromScheduleDayActions.EntityActions.UpdateFailEntity,
        fromScheduleDayActions.EntityActions.DestroyFailEntity
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
        fromScheduleDayActions.EntityActions.LoadEntity,
        fromScheduleDayActions.EntityActions.StoreSuccessEntity,
        fromScheduleDayActions.EntityActions.UpdateSuccessEntity,
        fromScheduleDayActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['schedule-day'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['schedule-day'] }));
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
