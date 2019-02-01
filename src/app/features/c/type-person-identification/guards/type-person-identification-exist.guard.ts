import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromTypePersonIdentification from '@web/app/features/c/type-person-identification/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypePersonIdentificationExistGuard implements CanActivate {

  constructor(
    private store: Store<fromTypePersonIdentification.State>
  ) { }

  hasInStore(typePersonIdentificationId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromTypePersonIdentification.getEntities),
      map(entities => !!entities[typePersonIdentificationId]),
      take(1)
    );
  }

  hasEntity(typePersonIdentificationId: string): Observable<boolean> {
    return this.hasInStore(typePersonIdentificationId).pipe(
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

  checkStore(typePersonIdentificationId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromTypePersonIdentification.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromTypePersonIdentification.LoadEntity({
            search: {
              type_person_identification: {
                type_person_identification_id: typePersonIdentificationId,
                type_person_identification_description: ''
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
    return this.checkStore(route.params.type_person_identification_id).pipe(
      switchMap(() => this.hasEntity(route.params.type_person_identification_id))
    );
  }

}
