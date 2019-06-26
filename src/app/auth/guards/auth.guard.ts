import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromAuth from '@web/app/auth/store';

import { Observable } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  canLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getUser),
      map(user => user),
      withLatestFrom(
        this.store.pipe(select(fromAuth.getPending))
      ),
      map(([user, pending]) => {
        if (!user && !pending) {
          this.store.dispatch(fromAuth.AuthActions.AuthRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getUser),
      map(user => user),
      withLatestFrom(
        this.store.pipe(select(fromAuth.getPending))
      ),
      map(([user, pending]) => {
        if (!user && !pending) {
          this.store.dispatch(fromAuth.AuthActions.AuthRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }

}
