import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromProfile from '../../profile/store';
import * as fromCore from './../../../core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuExistGuard implements CanActivate {

  constructor(
    private store: Store<fromProfile.State>
  ) { }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromProfile.getLoaded),
      tap(loaded => {
        if (!loaded) {
          return of(false);
        }
        return of(true);
      })
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore();
  }

}
