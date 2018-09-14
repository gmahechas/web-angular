import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { MacroprojectService } from './../services/macroproject.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class MacroprojectExistGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private macroprojectService: MacroprojectService
  ) { }

  hasInStore(macroproject_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[macroproject_id]),
      take(1)
    );
  }

  hasEntity(macroproject_id: string): Observable<boolean> {
    return this.hasInStore(macroproject_id).pipe(
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

  checkStore(macroproject_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadEntity({
            macroproject: {
              macroproject_id: macroproject_id,
              macroproject_name: '',
            },
            city: null,
            office: null
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
