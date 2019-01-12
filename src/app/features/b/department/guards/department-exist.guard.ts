import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromDepartment from '@web/app/features/b/department/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentExistGuard implements CanActivate {

  constructor(
    private store: Store<fromDepartment.State>
  ) { }

  hasInStore(department_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDepartment.getEntities),
      map(entities => !!entities[department_id]),
      take(1)
    );
  }

  hasEntity(department_id: string): Observable<boolean> {
    return this.hasInStore(department_id).pipe(
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

  checkStore(department_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromDepartment.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromDepartment.LoadEntity({
            search: {
              department: {
                department_id: department_id,
                department_name: ''
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
    return this.checkStore(route.params.department_id).pipe(
      switchMap(() => this.hasEntity(route.params.department_id))
    );
  }

}
