import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromEstate from '@web/app/features/a/estate/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstateExistGuard implements CanActivate {

  constructor(
    private store: Store<fromEstate.State>
  ) { }

  hasInStore(estateId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromEstate.getEntities),
      map(entities => !!entities[estateId]),
      take(1)
    );
  }

  hasEntity(estateId: string): Observable<boolean> {
    return this.hasInStore(estateId).pipe(
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

  checkStore(estateId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromEstate.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromEstate.EntityActions.LoadEntity({
            search: {
              estate: {
                estate_id: estateId,
                estate_name: '',
                estate_code: ''
              },
              country: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.estate_id).pipe(
      switchMap(() => this.hasEntity(route.params.estate_id))
    );
  }

}
