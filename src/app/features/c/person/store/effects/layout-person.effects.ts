import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCore from '@web/app/core/store';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class LayoutPersonEffects {

  // Notifications / Spinner
  @Effect({ dispatch: false })
  entity$ = this.actions$.pipe(
    ofType(
      fromPersonActions.EntityActionTypes.LoadEntity,
      fromPersonActions.EntityActionTypes.StoreEntity,
      fromPersonActions.EntityActionTypes.UpdateEntity,
      fromPersonActions.EntityActionTypes.DestroyEntity,
      fromPersonActions.EntityActionTypes.PaginateEntity,
      fromPersonActions.EntityActionTypes.LoadEntityShared
    ),
    tap(() => {
      this.store.dispatch(new fromCore.ShowSpinner);
    })
  );

  @Effect({ dispatch: false })
  loadSuccessEntity$ = this.actions$.pipe(
    ofType(
      fromPersonActions.EntityActionTypes.LoadSuccessEntity
    ),
    tap(() => {
      this.store.dispatch(new fromCore.CloseSpinner);
    })
  );

  @Effect({ dispatch: false })
  success$ = this.actions$.pipe(
    ofType(
      fromPersonActions.EntityActionTypes.StoreSuccessEntity,
      fromPersonActions.EntityActionTypes.UpdateSuccessEntity,
      fromPersonActions.EntityActionTypes.DestroySuccessEntity
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
      fromPersonActions.EntityActionTypes.LoadFailEntity,
      fromPersonActions.EntityActionTypes.StoreFailEntity,
      fromPersonActions.EntityActionTypes.UpdateFailEntity,
      fromPersonActions.EntityActionTypes.DestroyFailEntity
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
      fromPersonActions.EntityActionTypes.LoadEntity,
      fromPersonActions.EntityActionTypes.StoreSuccessEntity,
      fromPersonActions.EntityActionTypes.UpdateSuccessEntity,
      fromPersonActions.EntityActionTypes.DestroySuccessEntity,
      fromPersonActions.EntityActionTypes.Reset
    ),
    tap(() => {
      this.store.dispatch(new fromCore.Go({ path: ['person'] }));
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromCore.State>
  ) { }
}
