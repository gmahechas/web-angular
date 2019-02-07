import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store, select, Action } from '@ngrx/store';
import * as fromTypePersonReducers from '@web/app/features/c/type-person/store/reducers';
import * as fromTypePersonSelectors from '@web/app/features/c/type-person/store/selectors';
import * as fromTypePersonActions from '@web/app/features/c/type-person/store/actions';

import * as fromModels from '@web/app/features/c/type-person/models';

import { TypePersonService } from '@web/app/features/c/type-person/services/type-person.service';

import { of, from, asyncScheduler, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, debounceTime, skip, takeUntil } from 'rxjs/operators';

@Injectable()
export class EntityTypePersonEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromTypePersonActions.LoadEntity>(fromTypePersonActions.EntityActionTypes.LoadEntity),
    map(action => action.payload.search),
    withLatestFrom(
      this.store.pipe(select(fromTypePersonSelectors.getPerPage)),
      this.store.pipe(select(fromTypePersonSelectors.getCurrentPage))
    ),
    switchMap(([searchTypePerson, perPage, currentPage]: [fromModels.SearchTypePerson, number, number]) => {
      perPage = (perPage) ? perPage : searchTypePerson.limit;
      currentPage = (currentPage) ? currentPage : searchTypePerson.page;
      return this.typePersonService.load({ ...searchTypePerson, limit: perPage, page: currentPage }).pipe(
        map(({ data }) => new fromTypePersonActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromTypePersonActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  storeEntity$ = this.actions$.pipe(
    ofType<fromTypePersonActions.StoreEntity>(fromTypePersonActions.EntityActionTypes.StoreEntity),
    map(action => action.payload.entity),
    switchMap((typePerson: fromModels.TypePerson) => {
      return this.typePersonService.store(typePerson).pipe(
        map(({ data }) => new fromTypePersonActions.StoreSuccessEntity({ entity: data })),
        catchError((error) => of(new fromTypePersonActions.StoreFailEntity({ error })))
      );
    })
  );

  @Effect()
  updateEntity$ = this.actions$.pipe(
    ofType<fromTypePersonActions.UpdateEntity>(fromTypePersonActions.EntityActionTypes.UpdateEntity),
    map(action => action.payload.entity),
    switchMap((typePerson: fromModels.TypePerson) => {
      return this.typePersonService.update(typePerson).pipe(
        map(({ data }) => new fromTypePersonActions.UpdateSuccessEntity({ entity: data })),
        catchError((error) => of(new fromTypePersonActions.UpdateFailEntity({ error })))
      );
    })
  );

  @Effect()
  destroyEntity$ = this.actions$.pipe(
    ofType<fromTypePersonActions.DestroyEntity>(fromTypePersonActions.EntityActionTypes.DestroyEntity),
    map(action => action.payload.entity),
    switchMap((typePerson: fromModels.TypePerson) => {
      return this.typePersonService.destroy(typePerson).pipe(
        map(({ data }) => new fromTypePersonActions.DestroySuccessEntity({ entity: data })),
        catchError((error) => of(new fromTypePersonActions.DestroyFailEntity({ error })))
      );
    })
  );

  @Effect()
  paginateEntity$ = this.actions$.pipe(
    ofType<fromTypePersonActions.PaginateEntity>(fromTypePersonActions.EntityActionTypes.PaginateEntity),
    map(action => action.payload.page),
    withLatestFrom(
      this.store.pipe(select(fromTypePersonSelectors.getPerPage)),
      this.store.pipe(select(fromTypePersonSelectors.getQuery))
    ),
    switchMap(([currentPage, perPage, searchTypePerson]: [number, number, fromModels.SearchTypePerson]) => {
      return from(this.typePersonService.pagination({ ...searchTypePerson, limit: perPage, page: currentPage })).pipe(
        map(({ data }) => new fromTypePersonActions.LoadSuccessEntity({ entities: data })),
        catchError((error) => of(new fromTypePersonActions.LoadFailEntity({ error })))
      );
    })
  );

  @Effect()
  loadEntityShared$ = ({ debounce = 600, scheduler = asyncScheduler } = {}): Observable<Action> =>
    this.actions$.pipe(
      ofType<fromTypePersonActions.LoadEntityShared>(fromTypePersonActions.EntityActionTypes.LoadEntityShared),
      debounceTime(debounce, scheduler),
      map(action => action.payload.search),
      switchMap((searchTypePerson: fromModels.SearchTypePerson) => {
        if (
          searchTypePerson.type_person.type_person_id === '' &&
          searchTypePerson.type_person.type_person_description === ''
        ) {
          return EMPTY;
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(fromTypePersonActions.EntityActionTypes.LoadEntityShared),
          skip(1)
        );

        return this.typePersonService.load({ ...searchTypePerson, limit: 20, page: 1 }).pipe(
          takeUntil(nextSearch$),
          map(({ data }) => new fromTypePersonActions.LoadSuccessEntity({ entities: data })),
          catchError((error) => of(new fromTypePersonActions.LoadFailEntity({ error })))
        );

      })
    )

  constructor(
    private actions$: Actions,
    private typePersonService: TypePersonService,
    private store: Store<fromTypePersonReducers.State>
  ) { }
}
