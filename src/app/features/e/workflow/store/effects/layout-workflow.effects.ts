import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromWorkflowActions from '@web/app/features/e/workflow/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutWorkflowEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromWorkflowActions.EntityActionTypes.LoadEntity,
      fromWorkflowActions.EntityActionTypes.StoreEntity,
      fromWorkflowActions.EntityActionTypes.UpdateEntity,
      fromWorkflowActions.EntityActionTypes.DestroyEntity,
      fromWorkflowActions.EntityActionTypes.PaginateEntity,
      fromWorkflowActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromWorkflowActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromWorkflowActions.EntityActionTypes.StoreSuccessEntity,
      fromWorkflowActions.EntityActionTypes.UpdateSuccessEntity,
      fromWorkflowActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'success', summary: 'Exito', detail: 'Se llevo a cabo', key: 'toast' }
        ]
      }));
    })
  );

  @Effect({ dispatch: false })
  fail$ = this.actions$.pipe(
    ofType(
      fromWorkflowActions.EntityActionTypes.LoadFailEntity,
      fromWorkflowActions.EntityActionTypes.StoreFailEntity,
      fromWorkflowActions.EntityActionTypes.UpdateFailEntity,
      fromWorkflowActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
      this.store.dispatch(new fromCore.ShowMessages({
        messages: [
          { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
        ]
      }));
    })
  );

  // Redirects
  @Effect({ dispatch: false })
  successRedirect$ = this.actions$.pipe(
    ofType(
      fromWorkflowActions.EntityActionTypes.LoadEntity,
      fromWorkflowActions.EntityActionTypes.StoreSuccessEntity,
      fromWorkflowActions.EntityActionTypes.UpdateSuccessEntity,
      fromWorkflowActions.EntityActionTypes.DestroySuccessEntity,
      fromWorkflowActions.EntityActionTypes.ResetSearch
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['workflow'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
