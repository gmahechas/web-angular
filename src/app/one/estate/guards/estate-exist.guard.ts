import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { EstateService } from './../services/estate.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EstateExistGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private estateService: EstateService
  ) { }

  /* Always return 200 response */
  /*   hasInApi(estate_id: string) {
      return this.estateService.paginationEstate({ estate_id: +estate_id }).pipe(
        map(({ data }) => new fromStore.EntityLoadSuccess(data)),
        tap((action: fromStore.EntityLoadSuccess) => this.store.dispatch(action)),
        map(action => action.payload),
        map(searchEstate => !!searchEstate),
        catchError(() => {
          this.store.dispatch(new fromCore.Go({
            path: ['not-found']
          }));
          return of(false);
        })
      );
    } */

  hasInStore(estate_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[estate_id]),
      take(1)
    );
  }

  hasEntity(estate_id: string): Observable<boolean> {
    return this.hasInStore(estate_id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        /* this.hasInApi(estate_id); */
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(estate_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadEntity({
            estate: {
              estate_id: estate_id,
              estate_name: '',
              estate_code: ''
            },
            country: {
              country_id: null
            }
          }));
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params['estate_id']).pipe(
      switchMap(() => this.hasEntity(route.params['estate_id']))
    );
  }

}
