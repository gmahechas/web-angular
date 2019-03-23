import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCountryEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromCountryActions.EntityActionTypes.LoadEntity,
      fromCountryActions.EntityActionTypes.StoreEntity,
      fromCountryActions.EntityActionTypes.UpdateEntity,
      fromCountryActions.EntityActionTypes.DestroyEntity,
      fromCountryActions.EntityActionTypes.PaginateEntity,
      fromCountryActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: true }));
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromCountryActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner({ toggle: false }));
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromCountryActions.EntityActionTypes.StoreSuccessEntity,
      fromCountryActions.EntityActionTypes.UpdateSuccessEntity,
      fromCountryActions.EntityActionTypes.DestroySuccessEntity
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
      fromCountryActions.EntityActionTypes.LoadFailEntity,
      fromCountryActions.EntityActionTypes.StoreFailEntity,
      fromCountryActions.EntityActionTypes.UpdateFailEntity,
      fromCountryActions.EntityActionTypes.DestroyFailEntity
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
      fromCountryActions.EntityActionTypes.LoadEntity,
      fromCountryActions.EntityActionTypes.StoreSuccessEntity,
      fromCountryActions.EntityActionTypes.UpdateSuccessEntity,
      fromCountryActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['country'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromCountryActions.EntityActionTypes.Reset),
    map((action: fromCountryActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['country'] }));
      }
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
