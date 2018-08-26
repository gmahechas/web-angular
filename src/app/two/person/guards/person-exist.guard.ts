import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import * as fromCore from './../../../core/store';

import { PersonService } from './../services/person.service';

import { Observable, of } from 'rxjs';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class PersonExistGuard implements CanActivate {

  constructor(
    private store: Store<fromStore.State>,
    private personService: PersonService
  ) { }

  /* FIXME: Always return 200 response */
  /*   hasInApi(person_id: string) {
      return this.personService.paginationPerson({ person_id: +person_id }).pipe(
        map(({ data }) => new fromStore.EntityLoadSuccess(data)),
        tap((action: fromStore.EntityLoadSuccess) => this.store.dispatch(action)),
        map(action => action.payload),
        map(searchPerson => !!searchPerson),
        catchError(() => {
          this.store.dispatch(new fromCore.Go({
            path: ['not-found']
          }));
          return of(false);
        })
      );
    } */

  hasInStore(person_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getEntities),
      map(entities => !!entities[person_id]),
      take(1)
    );
  }

  hasEntity(person_id: string): Observable<boolean> {
    return this.hasInStore(person_id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        /* this.hasInApi(person_id); */
        this.store.dispatch(new fromCore.Go({
          path: ['not-found']
        }));
        return of(false);
      })
    );
  }

  checkStore(person_id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadEntity({
            person: {
              person_id: person_id,
              person_identification: ''
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
