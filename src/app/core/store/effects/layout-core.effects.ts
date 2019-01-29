import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromCoreReducers from '@web/app/core/store/reducers';
import * as fromCoreActions from '@web/app/core/store/actions';

import { LocalStorageService } from '@web/app/core/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { defer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCoreEffects {

  @Effect({ dispatch: false })
  setDefaultLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetDefaultLang),
    map((action: fromCoreActions.SetDefaultLang) => action.payload.lang),
    tap((lang: string) => {
      this.localStorageService.setLang(lang);
      this.translate.setDefaultLang(lang);
    })
  );

  @Effect({ dispatch: false })
  changeLang$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ChangeLang),
    map((action: fromCoreActions.ChangeLang) => action.payload.lang),
    tap((lang: string) => {
      this.localStorageService.setLang(lang);
      this.translate.use(lang);
    })
  );

  @Effect({ dispatch: false })
  setUserOffice$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetUserOffice),
    map((action: fromCoreActions.SetUserOffice) => action.payload.userOffice),
    tap((userOffice) => {
      this.localStorageService.setUserOffice(userOffice);
      this.localStorageService.setUserOfficeProject(null);
      this.store.dispatch(new fromCoreActions.Go({ path: ['dashboard'] }));
    })
  );

  @Effect({ dispatch: false })
  setUserOfficeProject$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetUserOfficeProject),
    map((action: fromCoreActions.SetUserOfficeProject) => action.payload.userOfficeProject),
    tap((userOfficeProject) => {
      this.localStorageService.setUserOfficeProject(userOfficeProject);
      this.store.dispatch(new fromCoreActions.Go({ path: ['dashboard'] }));
    })
  );

  @Effect({ dispatch: false })
  showMessages$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.ShowMessages),
    map((action: fromCoreActions.ShowMessages) => action.payload.messages),
    tap((message: any[]) => {
      this.messageService.addAll(message);
    })
  );

  @Effect({ dispatch: false })
  init$ = defer(() => {
    return of([
      this.localStorageService.getLang(),
      this.localStorageService.getUserOffice(),
      this.localStorageService.getUserOfficeProject()
    ]);
  }).pipe(
    tap(([lang, userOffice, userOfficeProject]) => {
      if (lang) {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang }));
      } else {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang: 'es-co' }));
      }
      this.store.dispatch(new fromCoreActions.SetUserOffice({ userOffice }));
      this.store.dispatch(new fromCoreActions.SetUserOfficeProject({ userOfficeProject }));
    })
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store<fromCoreReducers.State>,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }
}
