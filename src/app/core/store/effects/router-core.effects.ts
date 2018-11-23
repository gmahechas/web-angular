import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCoreActions from '@web/app/core/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterCoreEffects {


  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType(fromCoreActions.RouterActionTypes.Go),
    map((action: fromCoreActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    ofType(fromCoreActions.RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  forward$ = this.actions$.pipe(
    ofType(fromCoreActions.RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
