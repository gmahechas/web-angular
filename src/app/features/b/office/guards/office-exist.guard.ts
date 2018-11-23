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

  hasInStore(office_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOffice.getEntities),
      map(entities => !!entities[office_id]),
      take(1)
    );
  }

  hasEntity(office_id: string): Observable<boolean> {
    return this.hasInStore(office_id).pipe(
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

  checkStore(office_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromOffice.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromOffice.LoadEntity({
            search: {
              office: {
                office_id: office_id,
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
