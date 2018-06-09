import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromStore from '../../../core/store';
import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { AuthService } from '../../services/auth.service';

import { of, defer } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<fromActions.Login>(fromActions.AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: fromModels.Auth) =>
      this.authService
        .login(auth)
        .pipe(
          map(((token: fromModels.Token) => new fromActions.LoginSuccess(token)),
            catchError(error => of(new fromActions.LoginFailure(error)))
          )
        )
    ));

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<fromActions.LoginSuccess>(fromActions.AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap((token: fromModels.Token) => {
      this.authService.setToken(token);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.LoginRedirect),
    tap(authed => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.Logout),
    tap(authed => {
      this.authService.removeToken();
      this.store.dispatch(new fromStore.Go({
        path: ['auth']
      }));
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of('check login');
  }).pipe(
    tap((jum) => console.log(jum))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromStore.State>
  ) { }
}
