import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromScheduleDayActions from '@web/app/features/f/schedule-day/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutScheduleDayEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromScheduleDayActions.EntityActionTypes.LoadEntity,
      fromScheduleDayActions.EntityActionTypes.StoreEntity,
      fromScheduleDayActions.EntityActionTypes.UpdateEntity,
      fromScheduleDayActions.EntityActionTypes.DestroyEntity,
      fromScheduleDayActions.EntityActionTypes.PaginateEntity,
      fromScheduleDayActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromScheduleDayActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromScheduleDayActions.EntityActionTypes.StoreSuccessEntity,
      fromScheduleDayActions.EntityActionTypes.UpdateSuccessEntity,
      fromScheduleDayActions.EntityActionTypes.DestroySuccessEntity
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
      fromScheduleDayActions.EntityActionTypes.LoadFailEntity,
      fromScheduleDayActions.EntityActionTypes.StoreFailEntity,
      fromScheduleDayActions.EntityActionTypes.UpdateFailEntity,
      fromScheduleDayActions.EntityActionTypes.DestroyFailEntity
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

  /*   // Redirects
    @Effect({ dispatch: false })
    successRedirect$ = this.actions$.pipe(
      ofType(
        fromScheduleDayActions.EntityActionTypes.LoadEntity,
        fromScheduleDayActions.EntityActionTypes.StoreSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.UpdateSuccessEntity,
        fromScheduleDayActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['schedule_day'] }));
      })
    );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromScheduleDayActions.EntityActionTypes.Reset),
    map((action: fromScheduleDayActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['schedule_day'] }));
      }
    })
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
