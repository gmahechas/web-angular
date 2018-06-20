import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';

import * as fromAuth from './../store';
import * as AuthActions from '../store/actions/auth.actions';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  canLoad(): Observable<boolean> {

    return this.store.pipe(select(fromAuth.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {

    return this.store.pipe(select(fromAuth.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new AuthActions.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}