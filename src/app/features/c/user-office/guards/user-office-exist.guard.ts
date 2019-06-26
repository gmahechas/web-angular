import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOffice from '@web/app/features/c/user-office/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeExistGuard implements CanActivate {

  constructor(
    private store: Store<fromUserOffice.State>
  ) { }

  hasInStore(userOfficeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUserOffice.getEntities),
      map(entities => !!entities[userOfficeId]),
      take(1)
    );
  }

  hasEntity(userOfficeId: string): Observable<boolean> {
    return this.hasInStore(userOfficeId).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        this.store.dispatch(fromCore.RouterActions.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(userOfficeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUserOffice.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromUserOffice.EntityActions.LoadEntity({
            search: {
              user_office: {
                user_office_id: userOfficeId,
                user_office_status: null
              },
              user: null,
              office: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.user_office_id).pipe(
      switchMap(() => this.hasEntity(route.params.user_office_id))
    );
  }

}
