import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutOfficeDepartmentEffects {

  // Notifications / Spinner
  entity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActions.LoadEntity,
        fromOfficeDepartmentActions.EntityActions.StoreEntity,
        fromOfficeDepartmentActions.EntityActions.UpdateEntity,
        fromOfficeDepartmentActions.EntityActions.DestroyEntity,
        fromOfficeDepartmentActions.EntityActions.PaginateEntity,
        fromOfficeDepartmentActions.EntityActions.LoadEntityShared
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: true }));
      })
    ),
    { dispatch: false }
  );

  loadSuccessEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActions.LoadSuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
      })
    ),
    { dispatch: false }
  );

  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity,
        fromOfficeDepartmentActions.EntityActions.UpdateSuccessEntity,
        fromOfficeDepartmentActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
        this.store.dispatch(fromCore.LayoutActions.ShowMessages({
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
        fromOfficeDepartmentActions.EntityActions.LoadFailEntity,
        fromOfficeDepartmentActions.EntityActions.StoreFailEntity,
        fromOfficeDepartmentActions.EntityActions.UpdateFailEntity,
        fromOfficeDepartmentActions.EntityActions.DestroyFailEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.LayoutActions.ShowSpinner({ toggle: false }));
        this.store.dispatch(fromCore.LayoutActions.ShowMessages({
          messages: [
            { severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error.', key: 'toast' }
          ]
        }));
      })
    ),
    { dispatch: false }
  );

/*   // Redirects
  successRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromOfficeDepartmentActions.EntityActions.LoadEntity,
        fromOfficeDepartmentActions.EntityActions.StoreSuccessEntity,
        fromOfficeDepartmentActions.EntityActions.UpdateSuccessEntity,
        fromOfficeDepartmentActions.EntityActions.DestroySuccessEntity
      ),
      tap(() => {
        this.store.dispatch(fromCore.RouterActions.Go({ path: ['office_department'] }));
      })
    ),
    { dispatch: false }
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOfficeDepartmentActions.EntityActions.Reset),
      tap(({ redirect }) => {
        if (redirect) {
          this.store.dispatch(fromCore.RouterActions.Go({ path: ['office_department'] }));
        }
      })
    ),
    { dispatch: false }
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
