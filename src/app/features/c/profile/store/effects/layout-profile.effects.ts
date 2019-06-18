import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProfileActions from '@web/app/features/c/profile/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutProfileEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromProfileActions.EntityActionTypes.LoadEntity,
        fromProfileActions.EntityActionTypes.StoreEntity,
        fromProfileActions.EntityActionTypes.UpdateEntity,
        fromProfileActions.EntityActionTypes.DestroyEntity,
        fromProfileActions.EntityActionTypes.PaginateEntity,
        fromProfileActions.EntityActionTypes.LoadEntityShared
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
        fromProfileActions.EntityActionTypes.LoadSuccessEntity
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
        fromProfileActions.EntityActionTypes.StoreSuccessEntity,
        fromProfileActions.EntityActionTypes.UpdateSuccessEntity,
        fromProfileActions.EntityActionTypes.DestroySuccessEntity
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
        fromProfileActions.EntityActionTypes.LoadFailEntity,
        fromProfileActions.EntityActionTypes.StoreFailEntity,
        fromProfileActions.EntityActionTypes.UpdateFailEntity,
        fromProfileActions.EntityActionTypes.DestroyFailEntity
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
        fromProfileActions.EntityActionTypes.LoadEntity,
        fromProfileActions.EntityActionTypes.StoreSuccessEntity,
        fromProfileActions.EntityActionTypes.UpdateSuccessEntity,
        fromProfileActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['profile'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileActions.EntityActionTypes.Reset),
      map((action: fromProfileActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['profile'] }));
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
