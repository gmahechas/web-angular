import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromOfficeActions from '@web/app/features/b/office/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutOfficeEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeActions.EntityActionTypes.LoadEntity,
        fromOfficeActions.EntityActionTypes.StoreEntity,
        fromOfficeActions.EntityActionTypes.UpdateEntity,
        fromOfficeActions.EntityActionTypes.DestroyEntity,
        fromOfficeActions.EntityActionTypes.PaginateEntity,
        fromOfficeActions.EntityActionTypes.LoadEntityShared
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
        fromOfficeActions.EntityActionTypes.LoadSuccessEntity
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
        fromOfficeActions.EntityActionTypes.StoreSuccessEntity,
        fromOfficeActions.EntityActionTypes.UpdateSuccessEntity,
        fromOfficeActions.EntityActionTypes.DestroySuccessEntity
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
        fromOfficeActions.EntityActionTypes.LoadFailEntity,
        fromOfficeActions.EntityActionTypes.StoreFailEntity,
        fromOfficeActions.EntityActionTypes.UpdateFailEntity,
        fromOfficeActions.EntityActionTypes.DestroyFailEntity
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
        fromOfficeActions.EntityActionTypes.LoadEntity,
        fromOfficeActions.EntityActionTypes.StoreSuccessEntity,
        fromOfficeActions.EntityActionTypes.UpdateSuccessEntity,
        fromOfficeActions.EntityActionTypes.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['office'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeActions.EntityActionTypes.Reset),
      map((action: fromOfficeActions.Reset) => action.payload),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['office'] }));
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
