import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromProject from '@web/app/features/d/project/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectExistGuard implements CanActivate {

  constructor(
    private store: Store<fromProject.State>
  ) { }

  hasInStore(project_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProject.getEntities),
      map(entities => !!entities[project_id]),
      take(1)
    );
  }

  hasEntity(project_id: string): Observable<boolean> {
    return this.hasInStore(project_id).pipe(
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

  checkStore(project_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromProject.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromProject.LoadEntity({
            search: {
              project: {
                project_id: project_id,
                project_name: ''
              },
              macroproject: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.project_id).pipe(
      switchMap(() => this.hasEntity(route.params.project_id))
    );
  }

}
