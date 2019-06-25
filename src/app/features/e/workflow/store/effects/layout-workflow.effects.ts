import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutWorkflowEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromWorkflowActions.EntityActions.LoadEntity,
        fromWorkflowActions.EntityActions.StoreEntity,
        fromWorkflowActions.EntityActions.UpdateEntity,
        fromWorkflowActions.EntityActions.DestroyEntity,
        fromWorkflowActions.EntityActions.PaginateEntity,
        fromWorkflowActions.EntityActions.LoadEntityShared
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
        fromWorkflowActions.EntityActions.LoadSuccessEntity
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
        fromWorkflowActions.EntityActions.StoreSuccessEntity,
        fromWorkflowActions.EntityActions.UpdateSuccessEntity,
        fromWorkflowActions.EntityActions.DestroySuccessEntity
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
        fromWorkflowActions.EntityActions.LoadFailEntity,
        fromWorkflowActions.EntityActions.StoreFailEntity,
        fromWorkflowActions.EntityActions.UpdateFailEntity,
        fromWorkflowActions.EntityActions.DestroyFailEntity
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
        fromWorkflowActions.EntityActions.LoadEntity,
        fromWorkflowActions.EntityActions.StoreSuccessEntity,
        fromWorkflowActions.EntityActions.UpdateSuccessEntity,
        fromWorkflowActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['workflow'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromWorkflowActions.EntityActions.Reset),
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
