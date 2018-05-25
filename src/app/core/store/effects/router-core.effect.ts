import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { RouterActionTypes, Go, Back, Forward } from './../actions/router-core.actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {


  @Effect({ dispatch: false })
  go$ = this.actions$.pipe(
    ofType(RouterActionTypes.Go),
    map((action: Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  back$ = this.actions$.pipe(
    ofType(RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  forward$ = this.actions$.pipe(
    ofType(RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
