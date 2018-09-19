import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { UserOfficeService } from '../../services/user-office.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityUserOfficeEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap((searchUserOffice: fromModels.SearchUserOffice) => {
      return this.userOfficeService.load(searchUserOffice).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private userOfficeService: UserOfficeService,
  ) { }

}