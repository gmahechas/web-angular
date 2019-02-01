import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserActions from '@web/app/features/c/user/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromUserActions.EntityActionTypes.LoadEntity,
      fromUserActions.EntityActionTypes.StoreEntity,
      fromUserActions.EntityActionTypes.UpdateEntity,
      fromUserActions.EntityActionTypes.DestroyEntity,
      fromUserActions.EntityActionTypes.PaginateEntity,
      fromUserActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromUserActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromUserActions.EntityActionTypes.StoreSuccessEntity,
      fromUserActions.EntityActionTypes.UpdateSuccessEntity,
      fromUserActions.EntityActionTypes.DestroySuccessEntity
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
      fromUserActions.EntityActionTypes.LoadFailEntity,
      fromUserActions.EntityActionTypes.StoreFailEntity,
      fromUserActions.EntityActionTypes.UpdateFailEntity,
      fromUserActions.EntityActionTypes.DestroyFailEntity
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
      fromUserActions.EntityActionTypes.LoadEntity,
      fromUserActions.EntityActionTypes.StoreSuccessEntity,
      fromUserActions.EntityActionTypes.UpdateSuccessEntity,
      fromUserActions.EntityActionTypes.DestroySuccessEntity,
      fromUserActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['user'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
