import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUser from '@web/app/features/c/user/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserExistGuard implements CanActivate {

  constructor(
    private store: Store<fromUser.State>
  ) { }

  hasInStore(userId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUser.getEntities),
      map(entities => !!entities[userId]),
      take(1)
    );
  }

  hasEntity(userId: string): Observable<boolean> {
    return this.hasInStore(userId).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(userId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUser.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromUser.LoadEntity({
            search: {
              user: {
                user_id: userId,
                username: ''
              },
              person: null,
              profile: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.user_id).pipe(
      switchMap(() => this.hasEntity(route.params.user_id))
    );
  }

}
