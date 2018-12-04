import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromUserOfficeProjectActions from '@web/app/features/d/user-office-project/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutUserOfficeProjectEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromUserOfficeProjectActions.EntityActionTypes.LoadEntity,
      fromUserOfficeProjectActions.EntityActionTypes.StoreEntity,
      fromUserOfficeProjectActions.EntityActionTypes.UpdateEntity,
      fromUserOfficeProjectActions.EntityActionTypes.DestroyEntity,
      fromUserOfficeProjectActions.EntityActionTypes.PaginateEntity,
      fromUserOfficeProjectActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromUserOfficeProjectActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromUserOfficeProjectActions.EntityActionTypes.StoreSuccessEntity,
      fromUserOfficeProjectActions.EntityActionTypes.UpdateSuccessEntity,
      fromUserOfficeProjectActions.EntityActionTypes.DestroySuccessEntity
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
      fromUserOfficeProjectActions.EntityActionTypes.LoadFailEntity,
      fromUserOfficeProjectActions.EntityActionTypes.StoreFailEntity,
      fromUserOfficeProjectActions.EntityActionTypes.UpdateFailEntity,
      fromUserOfficeProjectActions.EntityActionTypes.DestroyFailEntity
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

  // Redirects
  @Effect({ dispatch: false })
  successRedirect$ = this.actions$.pipe(
    ofType(
      fromUserOfficeProjectActions.EntityActionTypes.LoadEntity,
      fromUserOfficeProjectActions.EntityActionTypes.StoreSuccessEntity,
      fromUserOfficeProjectActions.EntityActionTypes.UpdateSuccessEntity,
      fromUserOfficeProjectActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['userOfficeProject'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) {}
}
