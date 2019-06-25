import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromTypePerson from '@web/app/features/c/type-person/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypePersonExistGuard implements CanActivate {

  constructor(
    private store: Store<fromTypePerson.State>
  ) { }

  hasInStore(typePersonId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromTypePerson.getEntities),
      map(entities => !!entities[typePersonId]),
      take(1)
    );
  }

  hasEntity(typePersonId: string): Observable<boolean> {
    return this.hasInStore(typePersonId).pipe(
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

  checkStore(typePersonId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromTypePerson.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromTypePerson.EntityActions.LoadEntity({
            search: {
              type_person: {
                type_person_id: typePersonId,
                type_person_description: ''
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
    return this.checkStore(route.params.type_person_id).pipe(
      switchMap(() => this.hasEntity(route.params.type_person_id))
    );
  }

}
