import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUserOfficeProject from '@web/app/features/d/user-office-project/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserOfficeProjectExistGuard implements CanActivate {

  constructor(
    private store: Store<fromUserOfficeProject.State>
  ) { }

  hasInStore(userOfficeProjectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUserOfficeProject.getEntities),
      map(entities => !!entities[userOfficeProjectId]),
      take(1)
    );
  }

  hasEntity(userOfficeProjectId: string): Observable<boolean> {
    return this.hasInStore(userOfficeProjectId).pipe(
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

  checkStore(userOfficeProjectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromUserOfficeProject.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromUserOfficeProject.EntityActions.LoadEntity({
            search: {
              user_office_project: {
                user_office_project_id: userOfficeProjectId,
                user_office_project_status: null
              },
              user_office: null,
              project: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.user_office_project_id).pipe(
      switchMap(() => this.hasEntity(route.params.user_office_project_id))
    );
  }

}
