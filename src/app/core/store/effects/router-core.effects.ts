import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from '@web/app/core/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterCoreEffects {


  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType(fromActions.RouterActionTypes.Go),
    map((action: fromActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    ofType(fromActions.RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  forward$ = this.actions$.pipe(
    ofType(fromActions.RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
