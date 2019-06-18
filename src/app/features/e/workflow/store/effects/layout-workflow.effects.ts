import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutWorkflowEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromWorkflowActions.EntityActionTypes.LoadEntity,
        fromWorkflowActions.EntityActionTypes.StoreEntity,
        fromWorkflowActions.EntityActionTypes.UpdateEntity,
        fromWorkflowActions.EntityActionTypes.DestroyEntity,
        fromWorkflowActions.EntityActionTypes.PaginateEntity,
        fromWorkflowActions.EntityActionTypes.LoadEntityShared
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
        fromWorkflowActions.EntityActionTypes.LoadSuccessEntity
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
        fromWorkflowActions.EntityActionTypes.StoreSuccessEntity,
        fromWorkflowActions.EntityActionTypes.UpdateSuccessEntity,
        fromWorkflowActions.EntityActionTypes.DestroySuccessEntity
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
        fromWorkflowActions.EntityActionTypes.LoadFailEntity,
        fromWorkflowActions.EntityActionTypes.StoreFailEntity,
        fromWorkflowActions.EntityActionTypes.UpdateFailEntity,
        fromWorkflowActions.EntityActionTypes.DestroyFailEntity
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
        fromWorkflowActions.EntityActionTypes.LoadEntity,
        fromWorkflowActions.EntityActionTypes.StoreSuccessEntity,
        fromWorkflowActions.EntityActionTypes.UpdateSuccessEntity,
        fromWorkflowActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['workflow'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActionTypes.Reset),
      map((action: fromWorkflowActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['workflow'] }));
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
