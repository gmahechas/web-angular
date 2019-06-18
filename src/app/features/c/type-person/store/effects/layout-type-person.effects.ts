import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromTypePersonActions.EntityActionTypes.LoadEntity,
        fromTypePersonActions.EntityActionTypes.StoreEntity,
        fromTypePersonActions.EntityActionTypes.UpdateEntity,
        fromTypePersonActions.EntityActionTypes.DestroyEntity,
        fromTypePersonActions.EntityActionTypes.PaginateEntity,
        fromTypePersonActions.EntityActionTypes.LoadEntityShared
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
        fromTypePersonActions.EntityActionTypes.LoadSuccessEntity
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
        fromTypePersonActions.EntityActionTypes.StoreSuccessEntity,
        fromTypePersonActions.EntityActionTypes.UpdateSuccessEntity,
        fromTypePersonActions.EntityActionTypes.DestroySuccessEntity
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
        fromTypePersonActions.EntityActionTypes.LoadFailEntity,
        fromTypePersonActions.EntityActionTypes.StoreFailEntity,
        fromTypePersonActions.EntityActionTypes.UpdateFailEntity,
        fromTypePersonActions.EntityActionTypes.DestroyFailEntity
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
        fromTypePersonActions.EntityActionTypes.LoadEntity,
        fromTypePersonActions.EntityActionTypes.StoreSuccessEntity,
        fromTypePersonActions.EntityActionTypes.UpdateSuccessEntity,
        fromTypePersonActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['type-person'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonActions.EntityActionTypes.Reset),
      map((action: fromTypePersonActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['type-person'] }));
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
