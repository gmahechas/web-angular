import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProjectActions from '@web/app/features/d/project/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutProjectEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromProjectActions.EntityActionTypes.LoadEntity,
      fromProjectActions.EntityActionTypes.StoreEntity,
      fromProjectActions.EntityActionTypes.UpdateEntity,
      fromProjectActions.EntityActionTypes.DestroyEntity,
      fromProjectActions.EntityActionTypes.PaginateEntity,
      fromProjectActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromProjectActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromProjectActions.EntityActionTypes.StoreSuccessEntity,
      fromProjectActions.EntityActionTypes.UpdateSuccessEntity,
      fromProjectActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
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
      fromProjectActions.EntityActionTypes.LoadFailEntity,
      fromProjectActions.EntityActionTypes.StoreFailEntity,
      fromProjectActions.EntityActionTypes.UpdateFailEntity,
      fromProjectActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
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
      fromProjectActions.EntityActionTypes.LoadEntity,
      fromProjectActions.EntityActionTypes.StoreSuccessEntity,
      fromProjectActions.EntityActionTypes.UpdateSuccessEntity,
      fromProjectActions.EntityActionTypes.DestroySuccessEntity,
      fromProjectActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['project'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
