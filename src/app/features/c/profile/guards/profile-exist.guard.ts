import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromProfile from '@web/app/features/c/profile/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileExistGuard implements CanActivate {

  constructor(
    private store: Store<fromProfile.State>
  ) { }

  hasInStore(profileId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProfile.getEntities),
      map(entities => !!entities[profileId]),
      take(1)
    );
  }

  hasEntity(profileId: string): Observable<boolean> {
    return this.hasInStore(profileId).pipe(
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

  checkStore(profileId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProfile.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromProfile.EntityActions.LoadEntity({
            search: {
              profile: {
                profile_id: profileId,
                profile_name: ''
              }
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.profile_id).pipe(
      switchMap(() => this.hasEntity(route.params.profile_id))
    );
  }

}
