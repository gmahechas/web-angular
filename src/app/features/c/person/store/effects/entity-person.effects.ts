import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromPersonReducers from '@web/app/features/c/person/store/reducers';
import * as fromPersonSelectors from '@web/app/features/c/person/store/selectors';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';

import * as fromModels from '@web/app/features/c/person/models';

import { PersonService } from '@web/app/features/c/person/services/person.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil, mergeMap } from 'rxjs/operators';

@Injectable()
export class EntityPersonEffects {

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.LoadEntity),
      map(action => action.search),
      withLatestFrom(
        this.store.pipe(select(fromPersonSelectors.getPerPage)),
        this.store.pipe(select(fromPersonSelectors.getCurrentPage))
      ),
      mergeMap(([searchPerson, perPage, currentPage]: [fromModels.SearchPerson, number, number]) => {
        perPage = (perPage) ? perPage : searchPerson.limit;
        currentPage = (currentPage) ? currentPage : searchPerson.page;
        return this.personService.load({ ...searchPerson, limit: perPage, page: currentPage }).pipe(
          map(({ data }) => fromPersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromPersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  storeEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.StoreEntity),
      map(action => action.entity),
      mergeMap((person: fromModels.Person) => {
        return this.personService.store(person).pipe(
          map(({ data }) => fromPersonActions.EntityActions.StoreSuccessEntity({ entity: data })),
          catchError((error) => of(fromPersonActions.EntityActions.StoreFailEntity({ error })))
        );
      })
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.UpdateEntity),
      map(action => action.entity),
      mergeMap((person: fromModels.Person) => {
        return this.personService.update(person).pipe(
          map(({ data }) => fromPersonActions.EntityActions.UpdateSuccessEntity({ entity: data })),
          catchError((error) => of(fromPersonActions.EntityActions.UpdateFailEntity({ error })))
        );
      })
    )
  );

  destroyEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.DestroyEntity),
      map(action => action.entity),
      mergeMap((person: fromModels.Person) => {
        return this.personService.destroy(person).pipe(
          map(({ data }) => fromPersonActions.EntityActions.DestroySuccessEntity({ entity: data })),
          catchError((error) => of(fromPersonActions.EntityActions.DestroyFailEntity({ error })))
        );
      })
    )
  );

  paginateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.PaginateEntity),
      map(action => action.page),
      withLatestFrom(
        this.store.pipe(select(fromPersonSelectors.getPerPage)),
        this.store.pipe(select(fromPersonSelectors.getQuery))
      ),
      mergeMap(([currentPage, perPage, searchPerson]: [number, number, fromModels.SearchPerson]) => {
        return from(this.personService.pagination({ ...searchPerson, limit: perPage, page: currentPage })).pipe(
          map(({ data }) => fromPersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromPersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  loadEntityShared$ = createEffect(() => ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType(fromPersonActions.EntityActions.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.search),
      switchMap((searchPerson: fromModels.SearchPerson) => {
        if (
          searchPerson.person.person_id === '' &&
          searchPerson.person.person_identification === '' &&
          searchPerson.person.person_names === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromPersonActions.EntityActions.LoadEntityShared),
          skip(1)
        );

        return this.personService.load({ ...searchPerson, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => fromPersonActions.EntityActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(fromPersonActions.EntityActions.LoadFailEntity({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private store: Store<fromPersonReducers.State>
  ) { }
}
