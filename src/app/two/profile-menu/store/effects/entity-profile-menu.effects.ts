import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from '../actions';

import * as fromModels from './../../models';

import { ProfileMenuService } from '../../services/profile-menu.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class EntityProfileMenuEffects {

  @Effect()
  loadEntity$ = this.actions$.pipe(
    ofType<fromActions.LoadEntity>(fromActions.EntityActionTypes.LoadEntity),
    map(action => action.payload),
    switchMap((searchProfileMenu: fromModels.SearchProfileMenu) => {
      return this.profileMenuService.load(searchProfileMenu).pipe(
        map(({ data }) => new fromActions.LoadSuccessEntity(data)),
        catchError((errors) => {
          return of(new fromActions.LoadFailEntity(errors));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private profileMenuService: ProfileMenuService
  ) { }

}
