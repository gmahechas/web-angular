import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleDayHourRangeActions from '@web/app/features/f/schedule-day-hour-range/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleDayHourRangeEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromScheduleDayHourRangeActions.EntityActions.LoadEntity,
        fromScheduleDayHourRangeActions.EntityActions.StoreEntity,
        fromScheduleDayHourRangeActions.EntityActions.UpdateEntity,
        fromScheduleDayHourRangeActions.EntityActions.DestroyEntity,
        fromScheduleDayHourRangeActions.EntityActions.PaginateEntity,
        fromScheduleDayHourRangeActions.EntityActions.LoadEntityShared
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
        fromScheduleDayHourRangeActions.EntityActions.LoadSuccessEntity
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
        fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity,
        fromScheduleDayHourRangeActions.EntityActions.UpdateSuccessEntity,
        fromScheduleDayHourRangeActions.EntityActions.DestroySuccessEntity
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
        fromScheduleDayHourRangeActions.EntityActions.LoadFailEntity,
        fromScheduleDayHourRangeActions.EntityActions.StoreFailEntity,
        fromScheduleDayHourRangeActions.EntityActions.UpdateFailEntity,
        fromScheduleDayHourRangeActions.EntityActions.DestroyFailEntity
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
        fromScheduleDayHourRangeActions.EntityActions.LoadEntity,
        fromScheduleDayHourRangeActions.EntityActions.StoreSuccessEntity,
        fromScheduleDayHourRangeActions.EntityActions.UpdateSuccessEntity,
        fromScheduleDayHourRangeActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['schedule_day_hour_range'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayHourRangeActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['schedule_day_hour_range'] }));
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
