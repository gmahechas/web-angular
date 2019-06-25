import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromDay from '@web/app/features/f/day/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayExistGuard implements CanActivate {

  constructor(
    private store: Store<fromDay.State>
  ) { }

  hasInStore(dayId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDay.getEntities),
      map(entities => !!entities[dayId]),
      take(1)
    );
  }

  hasEntity(dayId: string): Observable<boolean> {
    return this.hasInStore(dayId).pipe(
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

  checkStore(dayId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDay.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromDay.EntityActions.LoadEntity({
            search: {
              day: {
                day_id: dayId,
                // TODO
              },
              // TODO
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.day_id).pipe(
      switchMap(() => this.hasEntity(route.params.day_id))
    );
  }

}
