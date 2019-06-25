import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromDepartmentActions from '@web/app/features/b/department/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutDepartmentEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromDepartmentActions.EntityActions.LoadEntity,
        fromDepartmentActions.EntityActions.StoreEntity,
        fromDepartmentActions.EntityActions.UpdateEntity,
        fromDepartmentActions.EntityActions.DestroyEntity,
        fromDepartmentActions.EntityActions.PaginateEntity,
        fromDepartmentActions.EntityActions.LoadEntityShared
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
        fromDepartmentActions.EntityActions.LoadSuccessEntity
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
        fromDepartmentActions.EntityActions.StoreSuccessEntity,
        fromDepartmentActions.EntityActions.UpdateSuccessEntity,
        fromDepartmentActions.EntityActions.DestroySuccessEntity
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
        fromDepartmentActions.EntityActions.LoadFailEntity,
        fromDepartmentActions.EntityActions.StoreFailEntity,
        fromDepartmentActions.EntityActions.UpdateFailEntity,
        fromDepartmentActions.EntityActions.DestroyFailEntity
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
        fromDepartmentActions.EntityActions.LoadEntity,
        fromDepartmentActions.EntityActions.StoreSuccessEntity,
        fromDepartmentActions.EntityActions.UpdateSuccessEntity,
        fromDepartmentActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(new fromCore.Go({ path: ['department'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDepartmentActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(new fromCore.Go({ path: ['department'] }));
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
