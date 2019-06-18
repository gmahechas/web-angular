import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleDayEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromScheduleDayActions.EntityActionTypes.LoadEntity,
        fromScheduleDayActions.EntityActionTypes.StoreEntity,
        fromScheduleDayActions.EntityActionTypes.UpdateEntity,
        fromScheduleDayActions.EntityActionTypes.DestroyEntity,
        fromScheduleDayActions.EntityActionTypes.PaginateEntity,
        fromScheduleDayActions.EntityActionTypes.LoadEntityShared
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
        fromScheduleDayActions.EntityActionTypes.LoadSuccessEntity
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
        fromScheduleDayActions.EntityActionTypes.StoreSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.UpdateSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.DestroySuccessEntity
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
        fromScheduleDayActions.EntityActionTypes.LoadFailEntity,
        fromScheduleDayActions.EntityActionTypes.StoreFailEntity,
        fromScheduleDayActions.EntityActionTypes.UpdateFailEntity,
        fromScheduleDayActions.EntityActionTypes.DestroyFailEntity
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
        fromScheduleDayActions.EntityActionTypes.LoadEntity,
        fromScheduleDayActions.EntityActionTypes.StoreSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.UpdateSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['schedule_day'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduleDayActions.EntityActionTypes.Reset),
      map((action: fromScheduleDayActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['schedule_day'] }));
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
