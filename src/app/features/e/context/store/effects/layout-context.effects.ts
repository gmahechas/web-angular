import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromContextActions from '@web/app/features/e/context/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutContextEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromContextActions.EntityActionTypes.LoadEntity,
      fromContextActions.EntityActionTypes.StoreEntity,
      fromContextActions.EntityActionTypes.UpdateEntity,
      fromContextActions.EntityActionTypes.DestroyEntity,
      fromContextActions.EntityActionTypes.PaginateEntity,
      fromContextActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromContextActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromContextActions.EntityActionTypes.StoreSuccessEntity,
      fromContextActions.EntityActionTypes.UpdateSuccessEntity,
      fromContextActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
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
      fromContextActions.EntityActionTypes.LoadFailEntity,
      fromContextActions.EntityActionTypes.StoreFailEntity,
      fromContextActions.EntityActionTypes.UpdateFailEntity,
      fromContextActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
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
      fromContextActions.EntityActionTypes.LoadEntity,
      fromContextActions.EntityActionTypes.StoreSuccessEntity,
      fromContextActions.EntityActionTypes.UpdateSuccessEntity,
      fromContextActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['context'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromContextActions.EntityActionTypes.Reset),
    map((action: fromContextActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['context'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
