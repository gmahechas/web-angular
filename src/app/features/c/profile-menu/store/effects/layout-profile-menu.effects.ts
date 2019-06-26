import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutProfileMenuEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProfileMenuActions.EntityActionTypes.LoadEntity,
        fromProfileMenuActions.EntityActionTypes.StoreEntity,
        fromProfileMenuActions.EntityActionTypes.UpdateEntity,
        fromProfileMenuActions.EntityActionTypes.DestroyEntity,
        fromProfileMenuActions.EntityActionTypes.PaginateEntity,
        fromProfileMenuActions.EntityActionTypes.LoadEntityShared
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
        fromProfileMenuActions.EntityActionTypes.LoadSuccessEntity
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
        fromProfileMenuActions.EntityActionTypes.StoreSuccessEntity,
        fromProfileMenuActions.EntityActionTypes.UpdateSuccessEntity,
        fromProfileMenuActions.EntityActionTypes.DestroySuccessEntity
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
        fromProfileMenuActions.EntityActionTypes.LoadFailEntity,
        fromProfileMenuActions.EntityActionTypes.StoreFailEntity,
        fromProfileMenuActions.EntityActionTypes.UpdateFailEntity,
        fromProfileMenuActions.EntityActionTypes.DestroyFailEntity
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
        fromProfileMenuActions.EntityActionTypes.LoadEntity,
        fromProfileMenuActions.EntityActionTypes.StoreSuccessEntity,
        fromProfileMenuActions.EntityActionTypes.UpdateSuccessEntity,
        fromProfileMenuActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['profile_menu'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileMenuActions.EntityActionTypes.Reset),
      map((action: fromProfileMenuActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['profile_menu'] }));
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
