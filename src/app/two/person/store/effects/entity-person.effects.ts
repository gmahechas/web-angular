import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromReducers from '@web/app/two/person/store/reducers';
import * as fromSelectors from '@web/app/two/person/store/selectors';
import * as fromActions from '@web/app/two/person/store/actions';

import * as fromModels from '@web/app/two/person/models';

import { PersonService } from '@web/app/two/person/services/person.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityPersonEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getCurrentPage))
    ),
    switchMap(([searchPerson, perPage, currentPage]: [fromModels.SearchPerson, number, number]) => {
      perPage = (perPage) ? perPage : searchPerson.limit;
      currentPage = (currentPage) ? currentPage : searchPerson.page;
      return this.personService.load({ ...searchPerson, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromActions.StoreEntity>(fromActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.store(person).pipe(
        map(({ data }) => new fromActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromActions.UpdateEntity>(fromActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.update(person).pipe(
        map(({ data }) => new fromActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromActions.DestroyEntity>(fromActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.destroy(person).pipe(
        map(({ data }) => new fromActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromActions.PaginateEntity>(fromActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromSelectors.getPerPage)),
      this.store.pipe(select(fromSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchPerson]: [number, number, fromModels.SearchPerson]) => {
      return from(this.personService.pagination({ ...searchPerson, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromActions.LoadEntityShared>(fromActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchPerson: fromModels.SearchPerson) => {
        if (
          searchPerson.person.person_id === '' &&
          searchPerson.person.person_identification === '' &&
          searchPerson.person.person_names === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.personService.load({ ...searchPerson, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private store: Store<fromReducers.State>
  ) { }
}
