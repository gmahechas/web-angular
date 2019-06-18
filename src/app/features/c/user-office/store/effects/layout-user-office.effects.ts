import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeActions from '@web/app/features/c/user-office/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromUserOfficeActions.EntityActionTypes.LoadEntity,
        fromUserOfficeActions.EntityActionTypes.StoreEntity,
        fromUserOfficeActions.EntityActionTypes.UpdateEntity,
        fromUserOfficeActions.EntityActionTypes.DestroyEntity,
        fromUserOfficeActions.EntityActionTypes.PaginateEntity,
        fromUserOfficeActions.EntityActionTypes.LoadEntityShared
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
        fromUserOfficeActions.EntityActionTypes.LoadSuccessEntity
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
        fromUserOfficeActions.EntityActionTypes.StoreSuccessEntity,
        fromUserOfficeActions.EntityActionTypes.UpdateSuccessEntity,
        fromUserOfficeActions.EntityActionTypes.DestroySuccessEntity
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
        fromUserOfficeActions.EntityActionTypes.LoadFailEntity,
        fromUserOfficeActions.EntityActionTypes.StoreFailEntity,
        fromUserOfficeActions.EntityActionTypes.UpdateFailEntity,
        fromUserOfficeActions.EntityActionTypes.DestroyFailEntity
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

  /*   // Redirects
    successRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          fromUserOfficeActions.EntityActionTypes.LoadEntity,
          fromUserOfficeActions.EntityActionTypes.StoreSuccessEntity,
          fromUserOfficeActions.EntityActionTypes.UpdateSuccessEntity,
          fromUserOfficeActions.EntityActionTypes.DestroySuccessEntity
        ),
        tap(() => {
          this.store.dispatch(new fromCore.Go({ path: ['user_office'] }));
        })
      ),
      { dispatch: false }
    );

    reset$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromUserOfficeActions.EntityActionTypes.Reset),
        map((action: fromUserOfficeActions.Reset) => action.payload),
        tap(({ redirect }) => {
          if (redirect) {
            this.store.dispatch(new fromCore.Go({ path: ['user_office'] }));
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
