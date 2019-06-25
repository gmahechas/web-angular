import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromPerson from '@web/app/features/c/person/store';
import * as fromCore from '@web/app/core/store';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonExistGuard implements CanActivate {

  constructor(
    private store: Store<fromPerson.State>
  ) { }

  hasInStore(personId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromPerson.getEntities),
      map(entities => !!entities[personId]),
      take(1)
    );
  }

  hasEntity(personId: string): Observable<boolean> {
    return this.hasInStore(personId).pipe(
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

  checkStore(personId: string): Observable<boolean> {
    return this.store.pipe(
      select(fromPerson.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(fromPerson.EntityActions.LoadEntity({
            search: {
              person: {
                person_id: personId,
                person_identification: '',
                person_names: ''
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
    return this.checkStore(route.params.person_id).pipe(
      switchMap(() => this.hasEntity(route.params.person_id))
    );
  }

}
