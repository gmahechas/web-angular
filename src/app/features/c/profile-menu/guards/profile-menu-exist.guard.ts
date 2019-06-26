import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromProfileMenu from '@web/app/features/c/profile-menu/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileMenuExistGuard implements CanActivate {

  constructor(
    private store: Store<fromProfileMenu.State>
  ) { }

  hasInStore(profileMenuId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProfileMenu.getEntities),
      map(entities => !!entities[profileMenuId]),
      take(1)
    );
  }

  hasEntity(profileMenuId: string): Observable<boolean> {
    return this.hasInStore(profileMenuId).pipe(
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

  checkStore(profileMenuId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProfileMenu.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromProfileMenu.LoadEntity({
            search: {
              profile_menu: {
                profile_menu_id: profileMenuId,
                profile_menu_status: null
              },
              profile: null,
              menu: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.profile_menu_id).pipe(
      switchMap(() => this.hasEntity(route.params.profile_menu_id))
    );
  }

}
