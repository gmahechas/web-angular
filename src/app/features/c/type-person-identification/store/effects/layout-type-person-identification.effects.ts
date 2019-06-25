import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromTypePersonIdentificationActions from '@web/app/features/c/type-person-identification/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutTypePersonIdentificationEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromTypePersonIdentificationActions.EntityActions.LoadEntity,
        fromTypePersonIdentificationActions.EntityActions.StoreEntity,
        fromTypePersonIdentificationActions.EntityActions.UpdateEntity,
        fromTypePersonIdentificationActions.EntityActions.DestroyEntity,
        fromTypePersonIdentificationActions.EntityActions.PaginateEntity,
        fromTypePersonIdentificationActions.EntityActions.LoadEntityShared
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
        fromTypePersonIdentificationActions.EntityActions.LoadSuccessEntity
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
        fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity,
        fromTypePersonIdentificationActions.EntityActions.UpdateSuccessEntity,
        fromTypePersonIdentificationActions.EntityActions.DestroySuccessEntity
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
        fromTypePersonIdentificationActions.EntityActions.LoadFailEntity,
        fromTypePersonIdentificationActions.EntityActions.StoreFailEntity,
        fromTypePersonIdentificationActions.EntityActions.UpdateFailEntity,
        fromTypePersonIdentificationActions.EntityActions.DestroyFailEntity
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
        fromTypePersonIdentificationActions.EntityActions.LoadEntity,
        fromTypePersonIdentificationActions.EntityActions.StoreSuccessEntity,
        fromTypePersonIdentificationActions.EntityActions.UpdateSuccessEntity,
        fromTypePersonIdentificationActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['type-person-identification'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromTypePersonIdentificationActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['type-person-identification'] }));
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
