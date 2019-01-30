import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromOfficeDepartmentActions from '@web/app/features/b/office-department/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutOfficeDepartmentEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromOfficeDepartmentActions.EntityActionTypes.LoadEntity,
      fromOfficeDepartmentActions.EntityActionTypes.StoreEntity,
      fromOfficeDepartmentActions.EntityActionTypes.UpdateEntity,
      fromOfficeDepartmentActions.EntityActionTypes.DestroyEntity,
      fromOfficeDepartmentActions.EntityActionTypes.PaginateEntity,
      fromOfficeDepartmentActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromOfficeDepartmentActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromOfficeDepartmentActions.EntityActionTypes.StoreSuccessEntity,
      fromOfficeDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
      fromOfficeDepartmentActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
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
      fromOfficeDepartmentActions.EntityActionTypes.LoadFailEntity,
      fromOfficeDepartmentActions.EntityActionTypes.StoreFailEntity,
      fromOfficeDepartmentActions.EntityActionTypes.UpdateFailEntity,
      fromOfficeDepartmentActions.EntityActionTypes.DestroyFailEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
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
      fromOfficeDepartmentActions.EntityActionTypes.LoadEntity,
      fromOfficeDepartmentActions.EntityActionTypes.StoreSuccessEntity,
      fromOfficeDepartmentActions.EntityActionTypes.UpdateSuccessEntity,
      fromOfficeDepartmentActions.EntityActionTypes.DestroySuccessEntity,
      fromOfficeDepartmentActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['office_department'] }));
    })
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
