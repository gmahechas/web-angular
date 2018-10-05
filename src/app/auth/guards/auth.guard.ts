import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from '@app/app/auth/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<fromStore.State>
  ) { }

  canLoad(): Observable<boolean> {

    return this.store.pipe(select(fromStore.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {

    return this.store.pipe(select(fromStore.getLoggedIn),
      map(logged => {
        if (!logged) {
          this.store.dispatch(new fromStore.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
