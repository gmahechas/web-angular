import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCoreActions from '@web/app/core/store/actions';

import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterCoreEffects {


  go$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.RouterActions.Go),
      tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, ...extras });
      })
    ),
    { dispatch: false }
  );

  back$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.RouterActions.Back),
      tap(() => this.location.back())
    ),
    { dispatch: false }
  );

  forward$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoreActions.RouterActions.Forward),
      tap(() => this.location.forward())
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}
