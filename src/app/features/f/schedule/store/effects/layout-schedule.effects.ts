import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleActions from '@web/app/features/f/schedule/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromScheduleActions.EntityActionTypes.LoadEntity,
        fromScheduleActions.EntityActionTypes.StoreEntity,
        fromScheduleActions.EntityActionTypes.UpdateEntity,
        fromScheduleActions.EntityActionTypes.DestroyEntity,
        fromScheduleActions.EntityActionTypes.PaginateEntity,
        fromScheduleActions.EntityActionTypes.LoadEntityShared
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
        fromScheduleActions.EntityActionTypes.LoadSuccessEntity
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
        fromScheduleActions.EntityActionTypes.StoreSuccessEntity,
        fromScheduleActions.EntityActionTypes.UpdateSuccessEntity,
        fromScheduleActions.EntityActionTypes.DestroySuccessEntity
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
        fromScheduleActions.EntityActionTypes.LoadFailEntity,
        fromScheduleActions.EntityActionTypes.StoreFailEntity,
        fromScheduleActions.EntityActionTypes.UpdateFailEntity,
        fromScheduleActions.EntityActionTypes.DestroyFailEntity
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
        fromScheduleActions.EntityActionTypes.LoadEntity,
        fromScheduleActions.EntityActionTypes.StoreSuccessEntity,
        fromScheduleActions.EntityActionTypes.UpdateSuccessEntity,
        fromScheduleActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['schedule'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleActions.EntityActionTypes.Reset),
      map((action: fromScheduleActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['schedule'] }));
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
