import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromCountryActions from '@web/app/features/a/country/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCountryEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
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
    ),
    { dispatch: false }
  );

  loadSuccessEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromCountryActions.EntityActionTypes.LoadSuccessEntity
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
    ),
    { dispatch: false }
  );

  fail$ = createEffect(() =>
    this.actions$.pipe(
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
    ),
    { dispatch: false }
  );

  // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromCountryActions.EntityActionTypes.LoadEntity,
        fromCountryActions.EntityActionTypes.StoreSuccessEntity,
        fromCountryActions.EntityActionTypes.UpdateSuccessEntity,
        fromCountryActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['country'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCountryActions.EntityActionTypes.Reset),
      map((action: fromCountryActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['country'] }));
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
