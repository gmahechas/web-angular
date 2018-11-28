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
  setOffice$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetOffice),
    map((action: fromCoreActions.SetOffice) => action.payload.office),
    tap((office) => {
      this.localStorageService.setOffice(office);
      this.store.dispatch(new fromCoreActions.Go({ path: ['dashboard'] }));
    })
  );

  @Effect({ dispatch: false })
  setProject$ = this.actions$.pipe(
    ofType(fromCoreActions.LayoutActionTypes.SetProject),
    map((action: fromCoreActions.SetProject) => action.payload.project),
    tap((project) => {
      this.localStorageService.setProject(project);
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
      this.localStorageService.getOffice(),
      this.localStorageService.getProject()
    ]);
  }).pipe(
    tap(([lang, office, project]) => {
      if (lang) {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang }));
      } else {
        this.store.dispatch(new fromCoreActions.SetDefaultLang({ lang: 'es-co' }));
      }
      this.store.dispatch(new fromCoreActions.SetOffice({ office }));
      this.store.dispatch(new fromCoreActions.SetProject({ project }));
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
