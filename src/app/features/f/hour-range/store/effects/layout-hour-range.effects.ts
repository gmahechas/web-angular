import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromHourRangeActions from '@web/app/features/f/hour-range/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutHourRangeEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromHourRangeActions.EntityActionTypes.LoadEntity,
        fromHourRangeActions.EntityActionTypes.StoreEntity,
        fromHourRangeActions.EntityActionTypes.UpdateEntity,
        fromHourRangeActions.EntityActionTypes.DestroyEntity,
        fromHourRangeActions.EntityActionTypes.PaginateEntity,
        fromHourRangeActions.EntityActionTypes.LoadEntityShared
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
        fromHourRangeActions.EntityActionTypes.LoadSuccessEntity
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
        fromHourRangeActions.EntityActionTypes.StoreSuccessEntity,
        fromHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
        fromHourRangeActions.EntityActionTypes.DestroySuccessEntity
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
        fromHourRangeActions.EntityActionTypes.LoadFailEntity,
        fromHourRangeActions.EntityActionTypes.StoreFailEntity,
        fromHourRangeActions.EntityActionTypes.UpdateFailEntity,
        fromHourRangeActions.EntityActionTypes.DestroyFailEntity
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
        fromHourRangeActions.EntityActionTypes.LoadEntity,
        fromHourRangeActions.EntityActionTypes.StoreSuccessEntity,
        fromHourRangeActions.EntityActionTypes.UpdateSuccessEntity,
        fromHourRangeActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['hour-range'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHourRangeActions.EntityActionTypes.Reset),
      map((action: fromHourRangeActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['hour-range'] }));
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
