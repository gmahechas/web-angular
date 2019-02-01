import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromDayActions from '@web/app/features/f/day/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutDayEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.LoadEntity,
      fromDayActions.EntityActionTypes.StoreEntity,
      fromDayActions.EntityActionTypes.UpdateEntity,
      fromDayActions.EntityActionTypes.DestroyEntity,
      fromDayActions.EntityActionTypes.PaginateEntity,
      fromDayActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromDayActions.EntityActionTypes.StoreSuccessEntity,
      fromDayActions.EntityActionTypes.UpdateSuccessEntity,
      fromDayActions.EntityActionTypes.DestroySuccessEntity
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
      fromDayActions.EntityActionTypes.LoadFailEntity,
      fromDayActions.EntityActionTypes.StoreFailEntity,
      fromDayActions.EntityActionTypes.UpdateFailEntity,
      fromDayActions.EntityActionTypes.DestroyFailEntity
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
      fromDayActions.EntityActionTypes.LoadEntity,
      fromDayActions.EntityActionTypes.StoreSuccessEntity,
      fromDayActions.EntityActionTypes.UpdateSuccessEntity,
      fromDayActions.EntityActionTypes.DestroySuccessEntity,
      fromDayActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['day'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
