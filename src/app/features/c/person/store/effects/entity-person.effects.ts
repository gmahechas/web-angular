import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromPersonReducers from '@web/app/features/c/person/store/reducers';
import * as fromPersonSelectors from '@web/app/features/c/person/store/selectors';
import * as fromPersonActions from '@web/app/features/c/person/store/actions';

import * as fromModels from '@web/app/features/c/person/models';

import { PersonService } from '@web/app/features/c/person/services/person.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityPersonEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromPersonActions.LoadEntity>(fromPersonActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromPersonSelectors.getPerPage)),
      this.store.pipe(select(fromPersonSelectors.getCurrentPage))
    ),
    switchMap(([searchPerson, perPage, currentPage]: [fromModels.SearchPerson, number, number]) => {
      perPage = (perPage) ? perPage : searchPerson.limit;
      currentPage = (currentPage) ? currentPage : searchPerson.page;
      return this.personService.load({ ...searchPerson, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromPersonActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromPersonActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromPersonActions.StoreEntity>(fromPersonActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.store(person).pipe(
        map(({ data }) => new fromPersonActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromPersonActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromPersonActions.UpdateEntity>(fromPersonActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.update(person).pipe(
        map(({ data }) => new fromPersonActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromPersonActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromPersonActions.DestroyEntity>(fromPersonActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((person: fromModels.Person) => {
      return this.personService.destroy(person).pipe(
        map(({ data }) => new fromPersonActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromPersonActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromPersonActions.PaginateEntity>(fromPersonActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromPersonSelectors.getPerPage)),
      this.store.pipe(select(fromPersonSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchPerson]: [number, number, fromModels.SearchPerson]) => {
      return from(this.personService.pagination({ ...searchPerson, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromPersonActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromPersonActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromPersonActions.LoadEntityShared>(fromPersonActions.EntityActionTypes.LoadEntityShared),
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
          ofType(fromPersonActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.personService.load({ ...searchPerson, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromPersonActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromPersonActions.LoadFailEntity({ error })))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private personService: PersonService,
    private store: Store<fromPersonReducers.State>
  ) { }
}
