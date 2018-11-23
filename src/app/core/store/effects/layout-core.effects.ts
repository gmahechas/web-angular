import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as fromReducers from '@web/app/core/store/reducers';
import * as fromActions from '@web/app/core/store/actions';

import { LocalStorageService } from '@web/app/core/services/local-storage.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { defer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LayoutCoreEffects {

  @Effect({ dispatch: false })
  setDefaultLang$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.SetDefaultLang),
    map((action: fromActions.SetDefaultLang) => action.payload.lang),
    tap((lang: string) => {
      this.translate.setDefaultLang(lang);
    })
  );

  @Effect({ dispatch: false })
  changeLang$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.ChangeLang),
    map((action: fromActions.ChangeLang) => action.payload.lang),
    tap((lang: string) => {
      this.translate.use(lang);
    })
  );

  @Effect({ dispatch: false })
  setOffice$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.SetOffice),
    map((action: fromActions.SetOffice) => action.payload.office),
    tap((office) => {
      this.localStorageService.setOffice(office);
    })
  );

  @Effect({ dispatch: false })
  setProject$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.SetProject),
    map((action: fromActions.SetProject) => action.payload.project),
    tap((project) => {
      this.localStorageService.setProject(project);
    })
  );

  @Effect({ dispatch: false })
  showMessages$ = this.actions$.pipe(
    ofType(fromActions.LayoutActionTypes.ShowMessages),
    map((action: fromActions.ShowMessages) => action.payload.messages),
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
        this.store.dispatch(new fromActions.SetDefaultLang({ lang }));
      } else {
        this.localStorageService.setLang('es-co');
        this.store.dispatch(new fromActions.SetDefaultLang({ lang: 'es-co' }));
      }

      if (office) {
        this.store.dispatch(new fromActions.SetOffice({ office }));
      } else {
        this.localStorageService.setOffice(null);
      }

      if (project) {
        this.store.dispatch(new fromActions.SetProject({ project }));
      } else {
        this.localStorageService.setProject(null);
      }

    })
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store<fromReducers.State>,
    private messageService: MessageService,
    private translate: TranslateService
  ) { }
}
