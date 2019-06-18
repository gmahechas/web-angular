import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromContextVarActions from '@web/app/features/e/context-var/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutContextVarEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromContextVarActions.EntityActionTypes.LoadEntity,
        fromContextVarActions.EntityActionTypes.StoreEntity,
        fromContextVarActions.EntityActionTypes.UpdateEntity,
        fromContextVarActions.EntityActionTypes.DestroyEntity,
        fromContextVarActions.EntityActionTypes.PaginateEntity,
        fromContextVarActions.EntityActionTypes.LoadEntityShared
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
        fromContextVarActions.EntityActionTypes.LoadSuccessEntity
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
        fromContextVarActions.EntityActionTypes.StoreSuccessEntity,
        fromContextVarActions.EntityActionTypes.UpdateSuccessEntity,
        fromContextVarActions.EntityActionTypes.DestroySuccessEntity
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
        fromContextVarActions.EntityActionTypes.LoadFailEntity,
        fromContextVarActions.EntityActionTypes.StoreFailEntity,
        fromContextVarActions.EntityActionTypes.UpdateFailEntity,
        fromContextVarActions.EntityActionTypes.DestroyFailEntity
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
        fromContextVarActions.EntityActionTypes.LoadEntity,
        fromContextVarActions.EntityActionTypes.StoreSuccessEntity,
        fromContextVarActions.EntityActionTypes.UpdateSuccessEntity,
        fromContextVarActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['context_var'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromContextVarActions.EntityActionTypes.Reset),
      map((action: fromContextVarActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['context_var'] }));
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
