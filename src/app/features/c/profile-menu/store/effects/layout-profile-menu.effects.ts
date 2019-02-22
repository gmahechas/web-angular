import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromProfileMenuActions from '@web/app/features/c/profile-menu/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutProfileMenuEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromProfileMenuActions.EntityActionTypes.LoadEntity,
      fromProfileMenuActions.EntityActionTypes.StoreEntity,
      fromProfileMenuActions.EntityActionTypes.UpdateEntity,
      fromProfileMenuActions.EntityActionTypes.DestroyEntity,
      fromProfileMenuActions.EntityActionTypes.PaginateEntity,
      fromProfileMenuActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner());
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromProfileMenuActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner());
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromProfileMenuActions.EntityActionTypes.StoreSuccessEntity,
      fromProfileMenuActions.EntityActionTypes.UpdateSuccessEntity,
      fromProfileMenuActions.EntityActionTypes.DestroySuccessEntity
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
      fromProfileMenuActions.EntityActionTypes.LoadFailEntity,
      fromProfileMenuActions.EntityActionTypes.StoreFailEntity,
      fromProfileMenuActions.EntityActionTypes.UpdateFailEntity,
      fromProfileMenuActions.EntityActionTypes.DestroyFailEntity
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
      fromProfileMenuActions.EntityActionTypes.LoadEntity,
      fromProfileMenuActions.EntityActionTypes.StoreSuccessEntity,
      fromProfileMenuActions.EntityActionTypes.UpdateSuccessEntity,
      fromProfileMenuActions.EntityActionTypes.DestroySuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['profile_menu'] }));
    })
  );

  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType(fromProfileMenuActions.EntityActionTypes.Reset),
    map((action: fromProfileMenuActions.Reset) => action.payload),
    tap(({ redirect }) => {
      if (redirect) {
        this.store.dispatch(new fromCore.Go({ path: ['profile_menu'] }));
      }
    })
  ); */

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
