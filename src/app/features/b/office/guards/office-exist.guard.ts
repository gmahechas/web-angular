import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromOffice from '@web/app/features/b/office/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficeExistGuard implements CanActivate {

  constructor(
    private store: Store<fromOffice.State>
  ) { }

  hasInStore(officeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOffice.getEntities),
      map(entities => !!entities[officeId]),
      take(1)
    );
  }

  hasEntity(officeId: string): Observable<boolean> {
    return this.hasInStore(officeId).pipe(
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

  checkStore(officeId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOffice.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromOffice.LoadEntity({
            search: {
              office: {
                office_id: officeId,
                office_name: '',
              },
              city: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.office_id).pipe(
      switchMap(() => this.hasEntity(route.params.office_id))
    );
  }

}
