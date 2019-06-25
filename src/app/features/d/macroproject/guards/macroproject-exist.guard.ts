import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromMacroproject from '@web/app/features/d/macroproject/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MacroprojectExistGuard implements CanActivate {

  constructor(
    private store: Store<fromMacroproject.State>
  ) { }

  hasInStore(macroprojectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromMacroproject.getEntities),
      map(entities => !!entities[macroprojectId]),
      take(1)
    );
  }

  hasEntity(macroprojectId: string): Observable<boolean> {
    return this.hasInStore(macroprojectId).pipe(
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

  checkStore(macroprojectId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromMacroproject.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromMacroproject.EntityActions.LoadEntity({
            search: {
              macroproject: {
                macroproject_id: macroprojectId,
                macroproject_name: '',
              },
              city: null,
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
    return this.checkStore(route.params.macroproject_id).pipe(
      switchMap(() => this.hasEntity(route.params.macroproject_id))
    );
  }

}
